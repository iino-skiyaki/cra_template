import fs from 'fs';

// コミット情報を読み込む
fs.readFile('pr_commits.json', 'utf8', (err, commitData) => {
    if (err) {
        console.error('Error reading the commits file:', err);
        process.exit(1);
    }

    
    // 変更ファイル情報を読み込む
    fs.readFile('pr_files.json', 'utf8', (err, fileData) => {
        if (err) {
            console.error('Error reading the file changes file:', err);
            process.exit(1);
        }
        
        const fileChanges = JSON.parse(fileData);
        // 変更されたファイル毎に変更内容を配列にする
        const fileChangesMap = fileChanges.map(file => ({
            fileName: file.filename,
            change: file.patch // 変更内容 (パッチ情報)
        }));

        // 変更されたファイル毎の変更内容配列をログ出力
        console.log(JSON.stringify(fileChangesMap, null, 2));
    });
});
