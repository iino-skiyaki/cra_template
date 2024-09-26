// scripts/log-pr-commit-info.js
const { execSync } = require('child_process');

// 環境変数からイベントデータを取得
const eventPath = process.env.GITHUB_EVENT_PATH;

// イベントデータを読み込む
const event = require(eventPath);

// PRのコミット情報を取得
const commits = event.pull_request.commits;

console.log('全てのコミット情報を取得します。');
console.log(commits)

if (commits > 0) {
  // すべてのコミットに対して情報を取得
  for (let i = 0; i < commits; i++) {
    const commitSha = event.pull_request.base.sha;
    const afterSha = event.pull_request.head.sha;

    console.log(`commitSha: ${(commitSha)} ~~ afterSha: ${(afterSha)}`)

    // // git showコマンドを実行して変更内容を取得
    // const commitMessage = execSync(`git log -1 --pretty=format:%s ${commitSha}`).toString();
    // const commitTimestamp = execSync(`git log -1 --pretty=format:%cd ${commitSha}`).toString();
    // const changes = execSync(`git show --pretty="" --name-status ${commitSha}`).toString();

    // console.log(`--- Commit Information for ${commitSha} ---`);
    // console.log(`Date: ${commitTimestamp}`);
    // console.log(`Message: ${commitMessage}`);
    // console.log(`Changes:\n${changes}`);
    // console.log('----------------------------------------\n');
  }
} else {
  console.log('No commits found in the PR.');
}
