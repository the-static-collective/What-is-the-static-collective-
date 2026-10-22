"""Breath Atlas: exact-pinned public branch evidence and refusal controls."""
import copy
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))

from breath_atlas_contract import validate, safe_source_url
from breath_atlas_project import project
from breath_atlas_render import render, build

A = 'a' * 40
B = 'b' * 40
C = 'c' * 40
D = 'd' * 40


def inputs():
    snapshot = {
        'schema': 'static-git-atlas/public-v1', 'owner': 'the-static-collective',
        'captured_at': '2026-10-22T12:58:16+00:00', 'repositories': [{
            'name': 'example', 'visibility': 'public', 'default_branch': 'main',
            'archived': False, 'branches': [{'name': 'main', 'sha': A}, {'name': 'feat/door', 'sha': B}],
            'open_prs': [
                {'number': 2, 'title': 'Open door', 'head_branch': 'feat/door', 'head_sha': B,
                 'head_repo': 'the-static-collective/example', 'base_branch': 'main',
                 'updated_at': '2026-10-22T00:00:00Z',
                 'url': 'https://github.com/the-static-collective/example/pull/2'},
                {'number': 3, 'title': 'Old head', 'head_branch': 'feat/door', 'head_sha': C,
                 'head_repo': 'the-static-collective/example', 'base_branch': 'main',
                 'updated_at': '2026-10-22T00:00:00Z',
                 'url': 'https://github.com/the-static-collective/example/pull/3'},
            ],
        }]}
    focus = {'schema': 'breath-atlas/focus-v0', 'snapshot_captured_at': snapshot['captured_at'],
             'branches': [{'repository': 'example', 'branch': 'feat/door', 'head_sha': B}]}
    observations = {'schema': 'breath-atlas/observations-v0', 'observations': []}
    comparisons = {'schema': 'breath-atlas/comparisons-v0', 'comparisons': []}
    return snapshot, focus, observations, comparisons


def obs(**overrides):
    v = {'id': 'door-code', 'repository': 'example', 'branch': 'feat/door', 'head_sha': B,
         'path': 'src/door.py', 'blob_sha': D, 'class': 'CODE', 'method': 'EXACT_SOURCE_READ',
         'observed_at': '2026-10-22', 'note': 'A <door> engine | experiment',
         'uncertainty': 'No tests executed.'}
    v.update(overrides)
    return v


class Contracts(unittest.TestCase):
    def test_exact_public_branch_passes(self):
        result = validate(*inputs())
        self.assertEqual(result['selected'][0]['head_sha'], B)
        self.assertEqual(result['selected'][0]['repository'], 'example')

    def test_private_visibility_rejected(self):
        x = list(inputs()); x[0]['repositories'][0]['visibility'] = 'private'
        with self.assertRaises(ValueError): validate(*x)

    def test_missing_visibility_rejected(self):
        x = list(inputs()); del x[0]['repositories'][0]['visibility']
        with self.assertRaises(ValueError): validate(*x)

    def test_unknown_repo_even_if_account_accessible_refused(self):
        x = list(inputs()); x[1]['branches'][0]['repository'] = 'account-private-project'
        with self.assertRaises(ValueError): validate(*x)

    def test_wrong_head_fails_closed(self):
        x = list(inputs()); x[1]['branches'][0]['head_sha'] = C
        with self.assertRaisesRegex(ValueError, 'stale|pin|SHA'): validate(*x)

    def test_invalid_or_duplicated_branch_and_overbudget(self):
        x = list(inputs()); x[1]['branches'].append(copy.deepcopy(x[1]['branches'][0]))
        with self.assertRaises(ValueError): validate(*x)
        x = list(inputs()); x[1]['branches'] *= 25
        with self.assertRaises(ValueError): validate(*x)

    def test_unknown_field_in_observation_rejected(self):
        x = list(inputs()); x[2]['observations'] = [obs(personal_email='somebody@example.org')]
        with self.assertRaises(ValueError): validate(*x)

    def test_inspection_mismatched_head_refused(self):
        x = list(inputs()); x[2]['observations'] = [obs(head_sha=C)]
        with self.assertRaisesRegex(ValueError, 'pin|SHA|stale'): validate(*x)

    def test_safe_source_url_rejects_traversal_and_encodes_path(self):
        with self.assertRaises(ValueError): safe_source_url('the-static-collective','example',B,'../secret')
        with self.assertRaises(ValueError): safe_source_url('the-static-collective','example',B,'src\\secret')
        self.assertTrue(safe_source_url('the-static-collective','example',B,'docs/one two.md').endswith('/docs/one%20two.md'))

    def test_unrecognized_evidence_method_rejected(self):
        x=list(inputs()); x[2]['observations']=[obs(method='I_RAN_THE_TEST_TRUST_ME')]
        with self.assertRaises(ValueError): validate(*x)

    def test_test_claim_requires_execution_evidence(self):
        x=list(inputs()); x[2]['observations']=[obs(method='VERIFIED_TEST_OUTPUT')]
        with self.assertRaises(ValueError): validate(*x)

    def test_compare_requires_pinned_base_commit(self):
        x=list(inputs()); x[3]['comparisons']=[{'id':'cmp1','repository':'example','branch':'feat/door',
            'head_sha':B,'base_sha':'bad','status':'ahead','ahead_by':1,'behind_by':0,'files_changed':2,
            'observed_at':'2026-10-22'}]
        with self.assertRaises(ValueError): validate(*x)


class Projection(unittest.TestCase):
    def test_uninspected_is_unknown_not_tested(self):
        data=project(validate(*inputs()))
        item=data['branches'][0]
        self.assertEqual(item['content_status'],'CONTENT_NOT_INSPECTED')
        self.assertEqual(item['test_status'],'TEST_NOT_RUN')
        self.assertEqual(item['pr_disposition'],'PR_DISPOSITION_UNKNOWN')
        self.assertEqual(item['capability_status'],'UNKNOWN')

    def test_exact_pr_matches_but_other_head_does_not(self):
        item=project(validate(*inputs()))['branches'][0]
        self.assertEqual([p['number'] for p in item['open_pr_exact_head']], [2])
        self.assertEqual([p['number'] for p in item['open_pr_other_head']], [3])
        self.assertEqual(item['pr_disposition'],'PR_DISPOSITION_UNKNOWN')

    def test_deleted_fork_pr_head_does_not_crash_or_impersonate_local(self):
        x=list(inputs());x[0]['repositories'][0]['open_prs'][0]['head_repo']=None
        item=project(validate(*x))['branches'][0]
        self.assertFalse(item['open_pr_exact_head'])

    def test_observed_source_still_has_no_test_proof(self):
        x=list(inputs()); x[2]['observations']=[obs()]
        item=project(validate(*x))['branches'][0]
        self.assertEqual(item['content_status'],'SOURCE_OBSERVED')
        self.assertEqual(item['test_status'],'TEST_NOT_RUN')
        self.assertEqual(item['capability_status'],'SOURCE_OBSERVED')
        self.assertIn(B,item['observations'][0]['url'])

    def test_docs_do_not_grant_operational_status(self):
        x=list(inputs()); x[2]['observations']=[obs(**{'class':'DOC', 'path':'README.md'})]
        item=project(validate(*x))['branches'][0]
        self.assertEqual(item['capability_status'],'DOCUMENT_OBSERVED')
        self.assertEqual(item['test_status'],'TEST_NOT_RUN')

    def test_compare_preserves_ancestry_without_promoting_truth(self):
        x=list(inputs()); x[3]['comparisons']=[{'id':'cmp1','repository':'example','branch':'feat/door',
            'head_sha':B,'base_sha':A,'status':'ahead','ahead_by':2,'behind_by':0,'files_changed':3,
            'observed_at':'2026-10-22'}]
        item=project(validate(*x))['branches'][0]
        self.assertEqual(item['comparisons'][0]['base_sha'],A)
        self.assertEqual(item['capability_status'],'UNKNOWN')
        self.assertFalse(item['deployment_verified'])

    def test_two_conflicting_observations_survive_distinctly(self):
        x=list(inputs());x[2]['observations']=[obs(),obs(id='door-doc', path='docs/limits.md',
            **{'class':'DOC','note':'Contradicting limit','uncertainty':'Open contradiction.'})]
        item=project(validate(*x))['branches'][0]
        self.assertEqual(len(item['observations']),2)
        self.assertIn('Open contradiction.',{o['uncertainty'] for o in item['observations']})


class Rendering(unittest.TestCase):
    def test_deterministic_markdown_and_escaped_untrusted_text(self):
        x=list(inputs());x[2]['observations']=[obs()]
        item=project(validate(*x))
        one=render(item);two=render(item)
        self.assertEqual(one,two)
        self.assertNotIn('<door>',one)
        self.assertIn('&lt;door&gt;',one)
        self.assertIn('TEST_NOT_RUN',one)
        self.assertIn(B,one)
        self.assertIn('2026-10-22',one)

    def test_build_check_reads_only_fixtures_and_rejects_stale(self):
        with tempfile.TemporaryDirectory() as t:
            root=Path(t);x=inputs()
            for name,value in zip(('snapshot','focus','observations','comparisons'),x):
                (root/(name+'.json')).write_text(json.dumps(value),encoding='utf-8')
            paths=[root/(n+'.json') for n in ('snapshot','focus','observations','comparisons')]
            output=root/'out'
            first=build(*paths,output,check=False)
            self.assertEqual(first['branches'],1)
            old=(output/'README.md').read_bytes()
            build(*paths,output,check=True)
            self.assertEqual(old,(output/'README.md').read_bytes())
            (output/'README.md').write_text('tampered',encoding='utf-8')
            with self.assertRaises(ValueError):build(*paths,output,check=True)
            self.assertFalse((root/'secrets.json').exists())


if __name__=='__main__':
    unittest.main()
