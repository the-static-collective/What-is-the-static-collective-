"""Strict public Git branch-evidence contract; no network access or Git execution."""
import json
import re
from urllib.parse import quote

SHA = re.compile(r'[0-9a-f]{40}\Z')
NAME = re.compile(r'[A-Za-z0-9._-]+\Z')
IDS = re.compile(r'[A-Za-z0-9][A-Za-z0-9._:-]{0,99}\Z')
CLASSES = {'CODE','TEST','FIXTURE','DOC','ASSET','BUILD','CI'}
METHODS = {'EXACT_SOURCE_READ','COMPARE_FILESTAT','VERIFIED_TEST_OUTPUT'}
STATUS = {'ahead','behind','diverged','identical'}


def fail(reason):
    raise ValueError('BREATH_ATLAS_REFUSED: ' + reason)


def obj(value, keys, optional=()):
    if not isinstance(value,dict): fail('expected object')
    if set(value) - (set(keys)|set(optional)): fail('unexpected fields')
    if set(keys) - set(value): fail('missing fields')


def valid_sha(v):
    return isinstance(v,str) and bool(SHA.fullmatch(v))


def valid_name(v):
    return isinstance(v,str) and bool(NAME.fullmatch(v)) and v not in ('.','..')


def valid_path(path):
    return isinstance(path,str) and len(path)<=256 and '\\' not in path and '\x00' not in path and \
        '?' not in path and '#' not in path and all(s and s not in ('.','..') and all(ord(c)>=32 for c in s) for s in path.split('/'))


def safe_source_url(owner,repo,sha,path):
    if not valid_name(owner) or not valid_name(repo) or not valid_sha(sha) or not valid_path(path):
        fail('unsafe source path or invalid SHA')
    return 'https://github.com/{}/{}/blob/{}/{}'.format(quote(owner),quote(repo),sha,
        '/'.join(quote(segment,safe='') for segment in path.split('/')))


def validate(snapshot,focus,observations,comparisons):
    if not isinstance(snapshot,dict) or snapshot.get('schema')!='static-git-atlas/public-v1': fail('unverified public snapshot schema')
    owner=snapshot.get('owner')
    if not valid_name(owner) or not isinstance(snapshot.get('captured_at'),str) or not isinstance(snapshot.get('repositories'),list): fail('unverified snapshot owner')
    allowed={}
    for repo in snapshot['repositories']:
        if not isinstance(repo,dict) or repo.get('visibility')!='public': fail('private or missing repository visibility')
        name=repo.get('name')
        if not valid_name(name) or name.casefold() in allowed: fail('invalid or duplicate public repository')
        if not isinstance(repo.get('branches'),list) or not isinstance(repo.get('open_prs'),list): fail('missing branch or PR collection')
        heads={}
        for ref in repo['branches']:
            if not isinstance(ref,dict) or not isinstance(ref.get('name'),str) or not valid_sha(ref.get('sha')): fail('invalid branch SHA')
            if ref['name'] in heads:fail('duplicate branch')
            heads[ref['name']]=ref['sha']
        allowed[name.casefold()] = (name,repo,heads)
    obj(focus,('schema','snapshot_captured_at','branches'))
    if focus['schema']!='breath-atlas/focus-v0' or focus['snapshot_captured_at']!=snapshot['captured_at']: fail('stale focus snapshot pin')
    if not isinstance(focus['branches'],list) or not 1<=len(focus['branches'])<=24: fail('focus must have 1–24 heads')
    selected=[];keys=set();repos=set()
    for raw in focus['branches']:
        obj(raw,('repository','branch','head_sha'))
        entry=allowed.get(str(raw['repository']).casefold())
        if not entry:fail('unknown, unverified or private focus repository')
        name,repository,heads=entry
        branch=raw['branch'];sha=raw['head_sha']
        if not isinstance(branch,str) or not valid_sha(sha) or branch not in heads or heads[branch]!=sha:fail('stale or wrong branch SHA pin')
        key=(name,branch,sha)
        if key in keys:fail('duplicate selected branch')
        keys.add(key);repos.add(name)
        selected.append({'repository':name,'branch':branch,'head_sha':sha,'source_repo':repository})
    if len(repos)>8:fail('focus exceeds eight public repositories')
    obj(observations,('schema','observations'))
    if observations['schema']!='breath-atlas/observations-v0' or not isinstance(observations['observations'],list) or len(observations['observations'])>256:fail('invalid observations')
    validated_obs=[];ids=set()
    for entry in observations['observations']:
        obj(entry,('id','repository','branch','head_sha','path','blob_sha','class','method','observed_at','note','uncertainty'),('run',))
        if not isinstance(entry['id'],str) or not IDS.fullmatch(entry['id']) or entry['id'] in ids:fail('duplicate or invalid evidence ID')
        ids.add(entry['id'])
        if (entry['repository'],entry['branch'],entry['head_sha']) not in keys:fail('stale inspection SHA pin or unselected branch')
        if entry['class'] not in CLASSES or entry['method'] not in METHODS or not valid_sha(entry['blob_sha']) or not valid_path(entry['path']):fail('invalid source evidence fields')
        if not isinstance(entry['observed_at'],str) or not re.fullmatch(r'\d{4}-\d{2}-\d{2}',entry['observed_at']):fail('observation date')
        if any(not isinstance(entry[k],str) or len(entry[k])>600 for k in ('note','uncertainty')):fail('unbounded evidence note')
        if entry['method']=='VERIFIED_TEST_OUTPUT':
            if entry['class']!='TEST' or 'run' not in entry:fail('test claim lacks execution evidence')
            obj(entry['run'],('command','environment','exit_code','synthetic','report_sha'))
            run=entry['run']
            if not (isinstance(run['command'],str) and bool(run['command']) and isinstance(run['environment'],str) and bool(run['environment']) and type(run['exit_code']) is int and run['exit_code']==0 and type(run['synthetic']) is bool and valid_sha(run['report_sha'])): fail('incomplete verified test report')
        elif 'run' in entry: fail('non-test evidence cannot carry run claim')
        validated_obs.append(dict(entry))
    obj(comparisons,('schema','comparisons'))
    if comparisons['schema']!='breath-atlas/comparisons-v0' or not isinstance(comparisons['comparisons'],list) or len(comparisons['comparisons'])>24:fail('invalid comparisons')
    validated_cmp=[];cmpids=set()
    for cmp in comparisons['comparisons']:
        obj(cmp,('id','repository','branch','head_sha','base_sha','status','ahead_by','behind_by','files_changed','observed_at'))
        if not isinstance(cmp['id'],str) or not IDS.fullmatch(cmp['id']) or cmp['id'] in cmpids:fail('duplicate/invalid comparison ID')
        cmpids.add(cmp['id'])
        if (cmp['repository'],cmp['branch'],cmp['head_sha']) not in keys or not valid_sha(cmp['base_sha']):fail('stale comparison SHA pin')
        _,repo,_=allowed[cmp['repository'].casefold()]
        if cmp['base_sha'] not in {x['sha'] for x in repo['branches']}:fail('unverifiable comparison base SHA')
        if cmp['status'] not in STATUS or any(type(cmp[k]) is not int or cmp[k]<0 for k in ('ahead_by','behind_by','files_changed')):fail('invalid compare statistics')
        if not isinstance(cmp['observed_at'],str) or not re.fullmatch(r'\d{4}-\d{2}-\d{2}',cmp['observed_at']):fail('invalid compare date')
        validated_cmp.append(dict(cmp))
    # Canonicalize to prevent input order from manufacturing meaning.
    return {'snapshot':{'owner':owner,'captured_at':snapshot['captured_at'],'sha256':__import__('hashlib').sha256(json.dumps(snapshot,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()},
            'selected':sorted(selected,key=lambda x:(x['repository'].casefold(),x['branch'])),
            'observations':sorted(validated_obs,key=lambda x:x['id']),
            'comparisons':sorted(validated_cmp,key=lambda x:x['id'])}
