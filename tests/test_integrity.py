"""Testes de integridade para a versão inicial do painel ENAJU."""
import json
from pathlib import Path
D=json.loads((Path(__file__).resolve().parents[1]/'data'/'portfolio.json').read_text(encoding='utf-8'))
assert len(D['projects']) == 20, 'A carteira inicial não deve omitir projetos.'
assert len(D['routines']) == 15, 'Demandas iniciais ausentes.'
assert len(D['milestones']) == 22, 'Marcos iniciais ausentes.'
ids={x['id'] for x in D['projects']}
assert len(ids)==len(D['projects'])
assert len({x['id'] for x in D['routines']})==len(D['routines'])
assert len({x['id'] for x in D['milestones']})==len(D['milestones'])
assert all(x['project_id'] in ids or not x['project_id'] for x in D['routines'])
assert all(x['project_id'] in ids for x in D['milestones'])
assert all(x['progress_pct'] is None for x in D['projects']), 'Porcentagem não comprovada na fonte inicial.'
assert all(x['owner_display'] for x in D['projects'])
assert all(not x.get('verified_current') for x in D['projects']), 'Situação inicial não verificada.'
assert all(not x.get('verified_current') for x in D['routines']), 'Demandas iniciais não foram verificadas agora.'
assert all('file_id' not in s and 'url' not in s for s in D['sources']), 'Links pessoais não podem ir ao repo.'
assert D['repository'] == 'redenacional-enaju-cnj/Painel_projetos'
print('OK: 20 frentes, 15 rotinas, 22 marcos, referências válidas e percentuais não inventados.')