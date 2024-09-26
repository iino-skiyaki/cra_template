// scripts/log-commit-info.js
const { execSync } = require('child_process');

// 環境変数からイベントデータを取得
const eventPath = process.env.GITHUB_EVENT_PATH;

// イベントデータを読み込む
const event = require(eventPath);

// コミット情報の取得
const commits = event.commits;

// コミットが存在する場合に処理
if (commits && commits.length > 0) {
  commits.forEach(commit => {
    const commitSha = commit.id;
    const commitMessage = commit.message;
    const commitTimestamp = commit.timestamp;

    // git showコマンドを実行して変更内容を取得
    const changes = execSync(`git show --pretty="" --name-status ${commitSha}`).toString();

    console.log(`--- Commit Information ---`);
    console.log(`Date: ${commitTimestamp}`);
    console.log(`Message: ${commitMessage}`);
    console.log(`Changes:\n${changes}`);
    console.log('-------------------------\n');
  });
} else {
  console.log('No commits found in the event data.');
}