const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const fontPath = './NotoSansJP-VariableFont_wght.ttf';

// ビデオの生成
ffmpeg()
  .input('color=blue:size=1280x720:rate=25') // 背景生成
  .inputFormat('lavfi')
  .input('./actions_job/images/Marisa.png') // 左端の画像
  .input('./actions_job/images/Reimu.png') // 右端の画像
  .duration(5) // 5秒間のビデオ
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
      filter: 'overlay',
      inputs: '[0:v][marisa_scaled]',
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
    {
      filter: 'drawtext',
      inputs: '[bg_with_images]',
      outputs: '[scene1]',
      options: {
        text: 'Hello',
        fontfile: fontPath, // フォントファイルのパス
        fontcolor: 'white',
        fontsize: 100,
        x: '(w-text_w)/2',
        y: '(h-text_h)/2',
        enable: 'between(t,0.1,2)', // 0秒から2秒まで表示
      },
    },
    {
      filter: 'drawtext',
      inputs: '[scene1]',
      options: {
        text: 'World',
        fontfile: fontPath, // フォントファイルのパス
        fontcolor: 'white',
        fontsize: 100,
        x: '(w-text_w)/2',
        y: '(h-text_h)/2',
        enable: 'between(t,2,4)', // 2秒から4秒まで表示
      },
    }
  ])
  .on('end', () => {
    console.log('ビデオの生成が完了しました');
  })
  .on('error', (err) => {
    console.error('エラーが発生しました: ' + err.message);
  }).save('output.mp4');