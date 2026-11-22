# Local House registry (optional)

This is an executable local file companion for STATIC SEED's skills. Requires Python 3.10+ standard library only. No server, cloud account, external API, SDK or subscription is needed.

```sh
python toolkit/seed_house.py init --file my-house.json --owner "A Person"
python toolkit/seed_house.py add-home --file my-house.json --id cleaning --name "Cleaning Business" --kind business
python toolkit/seed_house.py add-home --file my-house.json --id fiction --name "Story World" --kind fiction
python toolkit/seed_house.py add-room --file my-house.json --home cleaning --id operations --name "Operations"
python toolkit/seed_house.py add-room --file my-house.json --home fiction --id canon --name "Canon"
python toolkit/seed_house.py attach-bench --file my-house.json --home cleaning --room operations --bench business-desk
python toolkit/seed_house.py attach-bench --file my-house.json --home fiction --room canon --bench memento
python toolkit/seed_house.py show --file my-house.json
python toolkit/seed_house.py validate --file my-house.json
python toolkit/seed_house.py propose-crossing --file my-house.json --from cleaning/operations --to fiction/canon --ref proposal-mascot-1 --purpose "Review a mascot concept; no client records" --out crossing.json
```

The crossing packet is **PROPOSED** only, and does not move material, enable collaboration, invite a person, or grant access. The source/target room paths must exist locally. If the packet contains sensitive identifiers or the public examples are inappropriate, do not publish it.

`detach-bench` undoes an attachment without deleting a project's records. `archive-home` marks a home archived without deleting its rooms. `show` and `validate` are read-only. An existing registry is never overwritten by `init`.

Run tests: `python -m unittest discover -s tests -v` from the package root.

The companion script is not itself callable by the skills-only ChatGPT plugin. Save the exported registry manually or use an authorized file editing environment.
