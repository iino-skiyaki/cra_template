const { Octokit } = require("@octokit/rest");

async function getPRCommits() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: token });

  // GitHub Actionsのコンテキストからリポジトリ情報を取得
  const repo = process.env.GITHUB_REPOSITORY; // owner/repo
  const [owner, repoName] = repo.split('/');
  const pullNumber = process.env.GITHUB_EVENT_PULL_REQUEST_NUMBER;

  try {
    // PRのコミット情報を取得
    const { data: commits } = await octokit.pulls.listCommits({
      owner,
      repo: repoName,
      pull_number: pullNumber,
    });

    // 各コミットの詳細情報を表示
    commits.forEach(commit => {
      console.log('Commit message:', commit.commit.message);
      console.log('Author:', commit.commit.author.name);
      console.log('Date:', commit.commit.author.date);
      console.log('Changed files:');

      commit.files.forEach(file => {
        console.log(`- ${file.filename}`);
      });

      console.log('-----------------------------------');
    });
  } catch (error) {
    console.error('Error fetching PR commits:', error);
  }
}

getPRCommits();
