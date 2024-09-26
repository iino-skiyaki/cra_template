const fs = require('fs');

// JSONファイルを読み込む
fs.readFile('pr_commits.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        process.exit(1);
    }

    // JSONをオブジェクトに変換
    const commits = JSON.parse(data);

    // commitsデータを使って処理を行う
    console.log('Commits:', commits);
});
