"""Pure bounded branch-evidence projection, not admission or code execution."""
from breath_atlas_contract import safe_source_url


def project(validated: dict) -> dict:
    owner=validated['snapshot']['owner']
    rows=[]
    for selected in validated['selected']:
        repo=selected['repository'];branch=selected['branch'];sha=selected['head_sha']
        record=selected['source_repo']
        observations=[]
        for evidence in validated['observations']:
            if (evidence['repository'],evidence['branch'],evidence['head_sha'])!=(repo,branch,sha):continue
            v={k:evidence[k] for k in ('id','path','blob_sha','class','method','observed_at','note','uncertainty')}
            v['url']=safe_source_url(owner,repo,sha,evidence['path'])
            if evidence['method']=='VERIFIED_TEST_OUTPUT':
                v['run']=dict(evidence['run'])
            observations.append(v)
        comparison=[]
        for c in validated['comparisons']:
            if (c['repository'],c['branch'],c['head_sha'])!=(repo,branch,sha):continue
            c2={k:c[k] for k in ('id','head_sha','base_sha','status','ahead_by','behind_by','files_changed','observed_at')}
            c2['url']=f'https://github.com/{owner}/{repo}/compare/{c["base_sha"]}...{c["head_sha"]}'
            comparison.append(c2)
        exact=[];other=[]
        for pr in record['open_prs']:
            if ((pr.get('head_repo') or '').casefold()!=f'{owner}/{repo}'.casefold() or pr.get('head_branch')!=branch):
                continue
            item={'number':pr['number'],'title':pr['title'],
                  'url':f'https://github.com/{owner}/{repo}/pull/{pr["number"]}',
                  'head_sha':pr.get('head_sha'),'base_branch':pr.get('base_branch')}
            (exact if pr.get('head_sha')==sha else other).append(item)
        tested=[v for v in observations if v['method']=='VERIFIED_TEST_OUTPUT']
        has_code=any(v['class'] in ('CODE','BUILD','TEST','FIXTURE') and v['method']!='VERIFIED_TEST_OUTPUT' for v in observations)
        if has_code:cap='SOURCE_OBSERVED'
        elif observations:cap='DOCUMENT_OBSERVED'
        else:cap='UNKNOWN'
        rows.append({
            'repository':repo,'branch':branch,'head_sha':sha,
            'source_url':f'https://github.com/{owner}/{repo}/tree/{sha}',
            'content_status':'SOURCE_OBSERVED' if observations else 'CONTENT_NOT_INSPECTED',
            'test_status':('DECLARED_TEST_SUCCESS_FIXTURE' if any(v['run']['synthetic'] for v in tested)
                           else 'REPORTED_TEST_SUCCESS_UNVERIFIED') if tested else 'TEST_NOT_RUN',
            'pr_disposition':'PR_DISPOSITION_UNKNOWN',
            'capability_status':cap,
            'deployment_verified':False,
            'open_pr_exact_head':sorted(exact,key=lambda p:p['number']),
            'open_pr_other_head':sorted(other,key=lambda p:p['number']),
            'observations':observations,'comparisons':comparison,
        })
    return {'schema':'breath-atlas/projection-v0','classification':'SOURCE_OBSERVATION_NOT_AUTHORITY',
            'snapshot':dict(validated['snapshot']),
            'coverage':{'selected_branches':len(rows),'selected_repositories':len(set(x['repository'] for x in rows)),
                        'source_observations':len(validated['observations']),'compare_observations':len(validated['comparisons']),
                        'verified_deployments':0,'automatic_admissions':0},
            'branches':rows}
