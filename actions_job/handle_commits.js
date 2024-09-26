const fs = require('fs');

// コミット情報の処理
fs.readFile('pr_commits.json', 'utf8', (err, commitData) => {
    if (err) {
        console.error('Error reading the commits file:', err);
        process.exit(1);
    }
    const commits = JSON.parse(commitData);
    console.log('Commits:', commits);
});

// 変更されたファイル情報の処理
fs.readFile('pr_files.json', 'utf8', (err, fileData) => {
    if (err) {
        console.error('Error reading the file changes file:', err);
        process.exit(1);
    }
    const fileChanges = JSON.parse(fileData);
    console.log('File Changes:', fileChanges);
});
