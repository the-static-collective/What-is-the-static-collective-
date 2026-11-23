#!/usr/bin/env python3
"""STATIC SEED v2 local House registry. No network, auth, or remote writes."""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import tempfile
from pathlib import Path

SCHEMA = 'static-seed.house/v2'
CROSSING = 'static-seed.crossing/v1'
SLUG = re.compile(r'^[a-z][a-z0-9-]{0,47}$')
KINDS = {'business', 'fiction', 'publishing', 'research', 'other'}


class HouseError(ValueError):
    pass


def check_slug(value: str, what: str) -> str:
    if not SLUG.fullmatch(value) or '--' in value or value.endswith('-'):
        raise HouseError(f'{what} must be a simple lower-case slug (1-48 chars)')
    return value


def require_text(value: str, what: str) -> str:
    if not isinstance(value, str) or not value.strip() or len(value) > 200:
        raise HouseError(f'{what} must be 1-200 nonblank characters')
    return value.strip()


def validate(data: dict) -> None:
    if not isinstance(data, dict) or data.get('schema') != SCHEMA:
        raise HouseError('not a STATIC SEED v2 house registry')
    owner = data.get('owner')
    if not isinstance(owner, dict):
        raise HouseError('owner missing')
    check_slug(owner.get('id', ''), 'owner ID')
    require_text(owner.get('display_name'), 'owner name')
    if not isinstance(data.get('revision'), int) or data['revision'] < 0:
        raise HouseError('invalid revision')
    homes = data.get('homes')
    if not isinstance(homes, list):
        raise HouseError('homes must be an array')
    home_ids = set()
    for h in homes:
        if not isinstance(h, dict):
            raise HouseError('home must be an object')
        ident = check_slug(h.get('id', ''), 'home ID')
        if ident in home_ids:
            raise HouseError(f'duplicate home ID: {ident}')
        home_ids.add(ident)
        require_text(h.get('name'), 'home name')
        if h.get('kind') not in KINDS:
            raise HouseError(f'invalid kind for {ident}')
        if type(h.get('archived')) is not bool:
            raise HouseError(f'invalid archived flag for {ident}')
        rooms = h.get('rooms')
        if not isinstance(rooms, list):
            raise HouseError(f'rooms for {ident} must be an array')
        room_ids = set()
        for room in rooms:
            if not isinstance(room, dict):
                raise HouseError('room must be an object')
            rid = check_slug(room.get('id', ''), 'room ID')
            if rid in room_ids:
                raise HouseError(f'duplicate room ID {ident}/{rid}')
            room_ids.add(rid)
            require_text(room.get('name'), 'room name')
            if room.get('visibility') != 'private':
                raise HouseError('local v2 registry only supports private rooms; shared is not authenticated')
            benches = room.get('workbenches')
            if not isinstance(benches, list):
                raise HouseError('workbenches must be an array')
            if len(benches) != len(set(benches)):
                raise HouseError(f'duplicate workbench in {ident}/{rid}')
            for b in benches:
                check_slug(b, 'workbench ID')


def load(path: Path) -> dict:
    try:
        data = json.loads(path.read_text(encoding='utf-8'))
    except (OSError, ValueError) as exc:
        raise HouseError(f'cannot read registry: {exc}') from exc
    validate(data)
    return data


def atomic_write(path: Path, data: dict, *, create_only=False) -> None:
    payload = json.dumps(data, indent=2, ensure_ascii=False) + '\n'
    path.parent.mkdir(parents=True, exist_ok=True)
    if create_only:
        try:
            fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        except FileExistsError as exc:
            raise HouseError(f'refusing to overwrite existing file: {path}') from exc
        with os.fdopen(fd, 'w', encoding='utf-8') as out:
            out.write(payload)
        return
    fd, tmp = tempfile.mkstemp(prefix='.house-', suffix='.json', dir=path.parent)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as out:
            out.write(payload)
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def find_home(data: dict, hid: str) -> dict:
    for home in data['homes']:
        if home['id'] == hid:
            return home
    raise HouseError(f'unknown home: {hid}')


def find_room(data: dict, hid: str, rid: str) -> dict:
    home = find_home(data, hid)
    for room in home['rooms']:
        if room['id'] == rid:
            return room
    raise HouseError(f'unknown room: {hid}/{rid}')


def edit(data: dict, args: argparse.Namespace) -> None:
    cmd = args.command
    if cmd == 'add-home':
        check_slug(args.id, 'home ID')
        require_text(args.name, 'home name')
        if args.kind not in KINDS:
            raise HouseError('unknown kind')
        if any(h['id'] == args.id for h in data['homes']):
            raise HouseError('home ID already exists')
        data['homes'].append({'id': args.id, 'name': args.name, 'kind': args.kind, 'archived': False, 'rooms': []})
    elif cmd == 'add-room':
        check_slug(args.id, 'room ID')
        require_text(args.name, 'room name')
        home = find_home(data, args.home)
        if home['archived']:
            raise HouseError('cannot add room to archived home')
        if any(r['id'] == args.id for r in home['rooms']):
            raise HouseError('room ID already exists')
        home['rooms'].append({'id': args.id, 'name': args.name, 'visibility': 'private', 'workbenches': []})
    elif cmd in ('attach-bench', 'detach-bench'):
        check_slug(args.bench, 'workbench ID')
        room = find_room(data, args.home, args.room)
        benches = room['workbenches']
        if cmd == 'attach-bench':
            if args.bench in benches:
                raise HouseError('workbench already attached')
            benches.append(args.bench)
        else:
            if args.bench not in benches:
                raise HouseError('workbench is not attached')
            benches.remove(args.bench)
    elif cmd == 'archive-home':
        home = find_home(data, args.home)
        if home['archived']:
            raise HouseError('home already archived')
        home['archived'] = True
    else:
        raise HouseError(f'unsupported edit: {cmd}')
    data['revision'] += 1
    validate(data)


def propose_crossing(data: dict, source: str, target: str, refs: list[str], purpose: str) -> dict:
    def parse_room(spec):
        parts = spec.split('/')
        if len(parts) != 2:
            raise HouseError('room address must be home-id/room-id')
        hid, rid = parts
        find_room(data, hid, rid)
        return {'home': hid, 'room': rid}
    src, dst = parse_room(source), parse_room(target)
    if src == dst:
        raise HouseError('crossing requires distinct rooms')
    if not refs or len(refs) > 20:
        raise HouseError('provide 1-20 selected reference IDs')
    clean_refs = [require_text(x, 'reference') for x in refs]
    if len(set(clean_refs)) != len(clean_refs):
        raise HouseError('duplicate reference ID')
    return {
        'schema': CROSSING,
        'status': 'PROPOSED',
        'source': src,
        'target': dst,
        'resource_refs': clean_refs,
        'purpose': require_text(purpose, 'purpose'),
        'permissions': 'none; requires independent source and receiving-owner review',
        'scope': 'proposal-metadata-only',
        'expires_at': None,
        'decision': 'HELD'
    }


def parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest='command', required=True)
    def common(sp):
        sp.add_argument('--file', required=True, type=Path)
    x = sub.add_parser('init'); common(x)
    x.add_argument('--owner', required=True)
    x.add_argument('--owner-id', default='owner-local-1')
    x = sub.add_parser('add-home'); common(x)
    x.add_argument('--id', required=True); x.add_argument('--name', required=True)
    x.add_argument('--kind', default='other', choices=sorted(KINDS))
    x = sub.add_parser('add-room'); common(x)
    x.add_argument('--home', required=True); x.add_argument('--id', required=True); x.add_argument('--name', required=True)
    for name in ('attach-bench','detach-bench'):
        x = sub.add_parser(name); common(x)
        x.add_argument('--home', required=True); x.add_argument('--room', required=True); x.add_argument('--bench', required=True)
    x = sub.add_parser('archive-home'); common(x); x.add_argument('--home', required=True)
    for name in ('show','validate'):
        x = sub.add_parser(name); common(x)
    x = sub.add_parser('propose-crossing'); common(x)
    x.add_argument('--from', dest='source', required=True); x.add_argument('--to', dest='target', required=True)
    x.add_argument('--ref', dest='refs', action='append', required=True)
    x.add_argument('--purpose', required=True); x.add_argument('--out', required=True, type=Path)
    return p


def main(argv=None) -> int:
    args = parser().parse_args(argv)
    try:
        path = args.file
        if args.command == 'init':
            check_slug(args.owner_id, 'owner ID')
            data = {'schema': SCHEMA, 'owner': {'id': args.owner_id, 'display_name': require_text(args.owner, 'owner')}, 'revision': 0, 'homes': []}
            validate(data)
            atomic_write(path, data, create_only=True)
            print(f'Created private local House registry: {path}')
            return 0
        data = load(path)
        if args.command == 'validate':
            print(f'Valid House registry: {len(data["homes"])} homes, revision {data["revision"]}')
        elif args.command == 'show':
            print(f'House: {data["owner"]["display_name"]} (revision {data["revision"]})')
            for h in data['homes']:
                print(f'  Home {h["id"]}: {h["name"]} [{h["kind"]}]{" ARCHIVED" if h["archived"] else ""}')
                for r in h['rooms']:
                    print(f'    Room {r["id"]}: {r["name"]} | {", ".join(r["workbenches"]) or "no workbench"}')
        elif args.command == 'propose-crossing':
            packet = propose_crossing(data, args.source, args.target, args.refs, args.purpose)
            atomic_write(args.out, packet, create_only=True)
            print(f'Created PROPOSED packet (no access or data transfer): {args.out}')
        else:
            edit(data, args)
            atomic_write(path, data)
            print(f'Updated House registry: {args.command}, revision {data["revision"]}')
        return 0
    except HouseError as exc:
        print(f'HOLD: {exc}', file=sys.stderr)
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
