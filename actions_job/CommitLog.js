// scripts/log-commit-info.js
const { execSync } = require('child_process');

// 環境変数からイベントデータを取得
const eventPath = process.env.GITHUB_EVENT_PATH;

// イベントデータを読み込む
const event = require(eventPath);

// pushイベントの場合、最終コミットのSHAを取得
const commitSha = event.after;

if (commitSha) {
  // git showコマンドを実行して変更内容を取得
  const commitMessage = execSync(`git log -1 --pretty=format:%s ${commitSha}`).toString();
  const commitTimestamp = execSync(`git log -1 --pretty=format:%cd ${commitSha}`).toString();
  const changes = execSync(`git show --pretty="" --name-status ${commitSha}`).toString();

  console.log(`--- Commit Information ---`);
  console.log(`Date: ${commitTimestamp}`);
  console.log(`Message: ${commitMessage}`);
  console.log(`Changes:\n${changes}`);
  console.log('-------------------------\n');
} else {
  console.log('No commit SHA found in the event data.');
}
