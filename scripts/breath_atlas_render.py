#!/usr/bin/env python3
"""Offline Breath Atlas renderer. Never scans repos or executes donor code."""
import argparse
import html
import json
from pathlib import Path

from breath_atlas_contract import validate
from breath_atlas_project import project


def md(value):
    escaped=html.escape(str(value),quote=True)
    return escaped.replace('\\','\\\\').replace('|','\\|').replace('[','\\[').replace(']','\\]').replace('`','\\`').replace('\n',' ')


def render(data: dict) -> str:
    snap=data['snapshot'];coverage=data['coverage']
    lines=['# Breath Atlas — public branch evidence', '',
        '> **Source presence is not successful execution. Successful execution is not field proof or owner admission.**',
        '',f"Captured source topology: **{md(snap['captured_at'])}** · public-only scope · "
        f"snapshot SHA-256: `{snap['sha256']}`",'',
        f"Selected: **{coverage['selected_repositories']}** public repos / "
        f"**{coverage['selected_branches']}** exact branch heads / "
        f"**{coverage['source_observations']}** source observations.",'',
        'This page is a **bounded inspection aperture**, not an exhaustive branch or capability inventory. '
        'All statuses are observations at pinned source commits; missing tests, closed PR history, '
        'deployments and human permission remain **UNKNOWN** unless individually verified.', '',
        '## Branch evidence','',
        '| Project · retained branch | Exact head | Code observation | Test state | PR history |',
        '| --- | --- | --- | --- | --- |']
    for b in data['branches']:
        ref=f"[{md(b['repository'])} / {md(b['branch'])}]({b['source_url']})"
        lines.append(f"| {ref} | `{b['head_sha'][:12]}` | {md(b['capability_status'])} | "
                     f"{md(b['test_status'])} | {md(b['pr_disposition'])} |")
    for b in data['branches']:
        lines.extend(['',f"### {md(b['repository'])} / {md(b['branch'])}",'',
                      f"[Exact Git tree]({b['source_url']}) · `{b['head_sha']}`",'',
                      f"**Evidence:** {md(b['content_status'])} · **Execution:** {md(b['test_status'])} · "
                      f"**Deployment:** NOT_VERIFIED · **Admission:** NONE",''])
        if b['observations']:
            lines.extend(['#### Inspected source loci','', '| Class | Exact file / blob evidence | Observation (not capability certification) | Uncertainty |',
                          '| --- | --- | --- | --- |'])
            for e in b['observations']:
                lines.append(f"| {md(e['class'])} | [{md(e['path'])}]({e['url']}) | "
                             f"{md(e['note'])} | {md(e['uncertainty'])} |")
        else:
            lines.extend(['**CONTENT_NOT_INSPECTED:** Only the branch address has been retained.',''])
        if b['open_pr_exact_head']:
            lines.append('Exact-head open PR observations: '+', '.join(
                f"[#{p['number']}]({p['url']})" for p in b['open_pr_exact_head'])+'.')
        if b['open_pr_other_head']:
            lines.append('Related open PRs with a different head SHA: '+', '.join(
                f"[#{p['number']}]({p['url']})" for p in b['open_pr_other_head'])+'.')
        lines.extend(['','**Closed or merged PR disposition: UNKNOWN.**'])
        for c in b['comparisons']:
            lines.append(f"[Observed Git compare]({c['url']}): {md(c['status'])}, "
                         f"ahead {c['ahead_by']}, behind {c['behind_by']}, changed files {c['files_changed']} "
                         f"(observed {md(c['observed_at'])}); **not execution proof**.")
    lines.extend(['','## Community-fit worksheet (unassigned)','',
       '| Conversation | Potential question | Authority status |', '| --- | --- | --- |',
       '| OFFER | What capability could someone willingly share? | UNSELECTED |',
       '| NEED | What particular assistance does someone request? | NO PARTICIPANT DATA COLLECTED |',
       '| BUILD | What is one small, voluntarily accepted next experiment? | NOT PROPOSED TO A REAL ORGANIZATION |',
       '', 'This worksheet does not create an introduction, partnership, payment, deployment, or public-use permission.',
       '', '## How to use this evidence','',
       'Inspect the immutable source files; check exact branch ancestry and closed PRs separately; '
       'run tests in a declared environment before claiming demonstrated behavior; '
       'request owner admission and independently confirm any field act. Hold anything unverified.', ''])
    return '\n'.join(lines)


def build(snapshot_path,focus_path,observations_path,comparisons_path,output_dir,check=False):
    inputs=[]
    for path in (snapshot_path,focus_path,observations_path,comparisons_path):
        inputs.append(json.loads(Path(path).read_text(encoding='utf-8')))
    output=project(validate(*inputs))
    target=Path(output_dir)
    files={'public-branch-capabilities.json':json.dumps(output,indent=2,sort_keys=True,ensure_ascii=False)+'\n',
           'README.md':render(output)}
    if check:
        for name,source in files.items():
            path=target/name
            if not path.is_file() or path.read_text(encoding='utf-8')!=source:
                raise ValueError('BREATH_ATLAS_STALE_OUTPUT: '+str(path))
    else:
        target.mkdir(parents=True,exist_ok=True)
        for name,source in files.items():
            (target/name).write_text(source,encoding='utf-8')
    return {'branches':output['coverage']['selected_branches'], 'observations':output['coverage']['source_observations'],
            'snapshot_sha256':output['snapshot']['sha256'],'check':check}


def main(argv=None):
    parser=argparse.ArgumentParser(description=__doc__)
    for flag in ('snapshot','focus','observations','comparisons','output'):
        parser.add_argument('--'+flag,required=True,type=Path)
    parser.add_argument('--check',action='store_true')
    args=parser.parse_args(argv)
    result=build(args.snapshot,args.focus,args.observations,args.comparisons,args.output,args.check)
    print(json.dumps(result,sort_keys=True))

if __name__=='__main__':
    main()
