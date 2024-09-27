const fs = require('fs');
const { execSync } = require('child_process');

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
        console.log('File Changes:', JSON.stringify(fileChanges, null, 2));
        
        // コミット詳細の配列を作成
        const commitDetails = commits.commits.map(commit => {
            // コミットメッセージ
            const message = commit.message;

            // コミッター情報
            const author = commit.author?.name || 'Unknown';

            // コミットハッシュ
            const sha = commit.oid;

            // 変更内容を抽出
            const changes = fileChanges
                .filter(file => file.sha === sha)
                .map(file => ({
                    filename: file.filename,
                    status: file.status,
                    additions: file.additions,
                    deletions: file.deletions,
                    lines: [], // 変更行を格納する配列
                    changes: [] // 変更内容を格納する配列
                }));

            // 各ファイルに対する変更行の詳細を取得
            changes.forEach(change => {
                console.log('change in file content:', change);
            });

            return {
                message: message,
                author: author,
                change: changes, // 変更内容をここに格納
                sha: sha // コミットハッシュをここに格納
            };
        });

        // ログ出力
        console.log('Commit Details:', JSON.stringify(commitDetails, null, 2));
    });
});
