import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / 'toolkit' / 'seed_house.py'


class HouseCLI(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.house = Path(self.temp.name) / 'house.json'

    def run_cli(self, *args, rc=0):
        cmd = [sys.executable, str(SCRIPT), *args, '--file', str(self.house)]
        proc = subprocess.run(cmd, capture_output=True, text=True)
        self.assertEqual(proc.returncode, rc, proc.stdout + proc.stderr)
        return proc

    def test_dynamic_home_and_rooms(self):
        self.run_cli('init', '--owner', 'Test Owner')
        for home in ('business', 'fiction', 'publishing', 'research'):
            self.run_cli('add-home', '--id', home, '--name', home.title(), '--kind', 'other')
        self.run_cli('add-room', '--home', 'fiction', '--id', 'canon', '--name', 'Canon')
        self.run_cli('add-room', '--home', 'business', '--id', 'operations', '--name', 'Operations')
        self.run_cli('attach-bench', '--home', 'fiction', '--room', 'canon', '--bench', 'memento')
        self.run_cli('attach-bench', '--home', 'business', '--room', 'operations', '--bench', 'business-desk')
        result = json.loads(self.house.read_text())
        self.assertEqual(len(result['homes']), 4)
        self.assertEqual(result['homes'][1]['rooms'][0]['workbenches'], ['memento'])
        self.run_cli('validate')

    def test_duplicates_do_not_modify(self):
        self.run_cli('init', '--owner', 'Owner')
        self.run_cli('add-home', '--id', 'fiction', '--name', 'Fiction')
        before = self.house.read_text()
        self.run_cli('add-home', '--id', 'fiction', '--name', 'Again', rc=2)
        self.assertEqual(before, self.house.read_text())
        self.run_cli('init', '--owner', 'Another Owner', rc=2)
        self.assertEqual(before, self.house.read_text())

    def test_detach_archive_and_proposal(self):
        self.run_cli('init', '--owner', 'Owner')
        for x in ('fiction','publishing'):
            self.run_cli('add-home', '--id', x, '--name', x.title())
        self.run_cli('add-room', '--home', 'fiction', '--id', 'canon', '--name', 'Canon')
        self.run_cli('add-room', '--home', 'publishing', '--id', 'release', '--name', 'Release')
        self.run_cli('attach-bench', '--home', 'fiction', '--room', 'canon', '--bench', 'storyship')
        self.run_cli('detach-bench', '--home', 'fiction', '--room', 'canon', '--bench', 'storyship')
        out = Path(self.temp.name)/'crossing.json'
        proc = self.run_cli('propose-crossing', '--from','fiction/canon', '--to','publishing/release', '--ref','char-001', '--purpose','Review character concept', '--out', str(out))
        crossing = json.loads(out.read_text())
        self.assertEqual(crossing['status'], 'PROPOSED')
        self.assertEqual(crossing['resource_refs'], ['char-001'])
        self.assertNotIn('content', crossing)
        self.run_cli('archive-home', '--home', 'fiction')
        self.assertTrue(json.loads(self.house.read_text())['homes'][0]['archived'])
        self.run_cli('add-room', '--home', 'fiction', '--id', 'new', '--name','New', rc=2)

    def test_invalid_room_declines_crossing(self):
        self.run_cli('init', '--owner', 'Owner')
        before = self.house.read_text()
        out = Path(self.temp.name)/'cross.json'
        self.run_cli('propose-crossing', '--from','missing/one', '--to','missing/two', '--ref','a', '--purpose','x', '--out', str(out), rc=2)
        self.assertFalse(out.exists())
        self.assertEqual(before, self.house.read_text())

    def test_read_only_commands(self):
        self.run_cli('init', '--owner', 'Owner')
        before = self.house.read_bytes()
        self.run_cli('show')
        self.run_cli('validate')
        self.assertEqual(before, self.house.read_bytes())


if __name__ == '__main__':
    unittest.main()
