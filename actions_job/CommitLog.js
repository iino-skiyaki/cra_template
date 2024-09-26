// scripts/log-pr-commit-info.js
const { execSync } = require('child_process');

// 環境変数からイベントデータを取得
const eventPath = process.env.GITHUB_EVENT_PATH;

// イベントデータを読み込む
const event = require(eventPath);

// PRのコミット情報を取得
const commits = event.repository;

console.log('全てのコミット情報を取得します。');
console.log(JSON.stringify(commits, null, 2));