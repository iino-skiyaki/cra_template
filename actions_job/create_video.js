const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const fontPath = './DroidSansFallback.ttf';
function generateTextFilters(script) {
  const filters = [];
  let startTime = 0;
  let previousOutput = '[bg_with_images]';

  script.forEach((entry, index) => {
    const color = entry.speaker === 'reimu' ? 'red' : 'yellow';
    const currentOutput = index === script.length - 1 ? null : `[scene${index}]`;
    const filter = {
      filter: 'drawtext',
      inputs: previousOutput,
      options: {
        text: entry.words,
        fontfile: fontPath,
        fontcolor: color,
        fontsize: '40', // 画面幅に応じてフォントサイズを動的に調整
        bordercolor: 'black',
        borderw: 8,
        x: '(w-text_w)/2', // 画面幅の中央に配置
        y: '(h-text_h)-12', // 画面高さの中央に配置
        enable: `between(t,${startTime},${startTime + 2})`, // 2秒ずつ表示
      }
    };
    if (currentOutput) {
      filter.outputs = currentOutput;
    }
    filters.push(filter);
    previousOutput = currentOutput || previousOutput; // 次のフィルターの入力として使用
    startTime += 2;
  });

  return filters;
}

// 使用例
const script = [
  {
    speaker: 'reimu',
    words: 'こんにちは',
    image: './actions_job/screenshots/screenshots.png'
  },
  {
    speaker: 'marisa',
    words: 'こんばんは',
    image: './actions_job/screenshots/screenshots.png'
  }
];

console.log(generateTextFilters(script));

const ffmpegCommand = ffmpeg()
  .input('color=blue:size=1280x720:rate=25') // 背景生成
  .inputFormat('lavfi')
  .input('./actions_job/images/Marisa.png') // 左端の画像
  .input('./actions_job/images/Reimu.png')  // 右端の画像
  .input('./actions_job/screenshots/screenshots.png') // 画面いっぱいに配置する画像
  .duration(script.length * 2) // 5秒間のビデオ
  .complexFilter([
    {
      filter: 'scale',
      inputs: '[1:v]',
      outputs: '[marisa_scaled]',
      options: {
        width: '300', // 元の200の1.5倍
        height: -1
      }
    },
    {
      filter: 'scale',
      inputs: '[2:v]',
      outputs: '[reimu_scaled]',
      options: {
        width: '300', // 元の200の1.5倍
        height: -1
      }
    },
    {
      filter: 'scale',
      inputs: '[3:v]',  // screenshots.png を入力
      outputs: '[screenshot_scaled]',
      options: {
        width: '1280',  // 画面の幅にスケール
        height: '720',  // 画面の高さにスケール
        force_original_aspect_ratio: 'increase'  // アスペクト比を維持しながら拡大
      }
    },
    {
      filter: 'crop',
      inputs: '[screenshot_scaled]',  // スケールされた画像をクロップ
      outputs: '[screenshot_cropped]',
      options: {
        out_w: '1280',  // 画面の幅にクロップ
        out_h: '720',   // 画面の高さにクロップ
        x: '(in_w-out_w)/2',  // 横方向中央にクロップ
        y: '(in_h-out_h)/2'   // 縦方向中央にクロップ
      }
    },
    {
      filter: 'overlay',
      inputs: '[0:v][screenshot_cropped]',  // 背景に screenshots.png を配置
      outputs: '[bg_with_screenshot]',
      options: {
        x: 0,
        y: 0
      }
    },
    {
      filter: 'overlay',
      inputs: '[bg_with_screenshot][marisa_scaled]',
      outputs: '[bg_with_marisa]',
      options: {
        x: 0,
        y: 'main_h-overlay_h'
      }
    },
    {
      filter: 'overlay',
      inputs: '[bg_with_marisa][reimu_scaled]',
      outputs: '[bg_with_images]',
      options: {
        x: 'main_w-overlay_w',
        y: 'main_h-overlay_h'
      }
    },
    ...generateTextFilters(script) // 生成したフィルターを追加
  ])
  .on('end', () => {
    console.log('ビデオの生成が完了しました');
  })
  .on('error', (err) => {
    console.error('エラーが発生しました: ' + err.message);
  })

// スクリプトの各エントリの画像を事前に読み込む
script.forEach(entry => {
  ffmpegCommand.input(entry.image);
});

ffmpegCommand.save('output.mp4');