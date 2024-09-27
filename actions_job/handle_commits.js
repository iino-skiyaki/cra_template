const fs = require('fs');

// コミット情報を読み込む
fs.readFile('pr_commits.json', 'utf8', (err, commitData) => {
    if (err) {
        console.error('Error reading the commits file:', err);
        process.exit(1);
    }

    const commits = JSON.parse(commitData);
    
    // 変更ファイル情報を読み込む
    fs.readFile('pr_files.json', 'utf8', (err, fileData) => {
        if (err) {
            console.error('Error reading the file changes file:', err);
            process.exit(1);
        }
        
        const fileChanges = JSON.parse(fileData);
        
        // 各コミットに対してメッセージ、変更内容、コミッターをセットにする
        const commitDetails = commits.commits.map(commit => {
            // コミットメッセージ
            const message = commit.message;

            // コミッター情報
            const author = commit.author.name;

            // 変更内容（ファイル名と変更内容を抽出）
            const changes = fileChanges.filter(file => file.sha === commit.oid)
                .map(file => ({
                    filename: file.filename,
                    status: file.status,
                    additions: file.additions,
                    deletions: file.deletions
                }));

            return {
                message,
                author,
                changes
            };
        });

        // ログ出力
        console.log('Commit Details:', JSON.stringify(commitDetails, null, 2));
    });
});
