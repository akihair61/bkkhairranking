#!/bin/bash
# ランキングサイトを GitHub に公開する（初回だけ Aki が実行）
set -e
cd /Users/akihair61/bkk-ranking
gh repo create akihair61/bkkhairranking --public --source=. --push --description "Bangkok Japanese Hair Salon Guide 2026 (bkkhairrangking.com)"
sleep 3
gh api -X POST repos/akihair61/bkkhairranking/pages -f 'source[branch]=main' -f 'source[path]=/docs' >/dev/null
sleep 5
gh api -X PUT repos/akihair61/bkkhairranking/pages -f cname=www.bkkhairrangking.com >/dev/null
gh api repos/akihair61/bkkhairranking/pages | python3 -c "import json,sys;j=json.load(sys.stdin);print('Pages:',j.get('html_url'),'| cname:',j.get('cname'),'| status:',j.get('status'))"
echo "→ 仮の住所: https://akihair61.github.io/bkkhairranking/  （DNS 切替後は https://www.bkkhairrangking.com）"
