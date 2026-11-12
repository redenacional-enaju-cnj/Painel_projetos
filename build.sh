#!/usr/bin/env sh
# Cloudflare Pages: publique somente os ativos de execução, não a base fonte,
# a documentação interna ou os testes do repositório Git.
set -eu
rm -rf dist
mkdir -p dist/assets dist/data
cp index.html app.js styles.css dist/
cp assets/enaju-logo.png assets/enaju-favicon.svg dist/assets/
cp data/portfolio.json dist/data/
cat > dist/_routes.json <<'ROUTES'
{"version":1,"include":["/*"],"exclude":[]}
ROUTES
printf 'Arquivos publicados (todos protegidos por functions/_middleware.js):\n'
find dist -type f | sort