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
  const startCommitSha = event.pull_request.base.sha;
  const endCommitSha = event.pull_request.head.sha;
  console.log('Start Commit:', startCommitSha);
  console.log('End Commit:', endCommitSha);

  try {
    // git logを使ってコミットのハッシュを取得
    const commitHashes = execSync(`git log --pretty=format:"%H" ${startCommitSha}..${endCommitSha}`)
      .toString()
      .trim()
      .split('\n'); // 各行を配列に変換
  
    // 取得したコミットハッシュをログに出力
    console.log('Commit Hashes:', commitHashes);
  } catch (error) {
    console.error('Error retrieving commit hashes:', error.message);
  }
  // すべてのコミットに対して情報を取得
  for (let i = 0; i < commits; i++) {


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
