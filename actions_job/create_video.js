const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const fontPath = './NotoSansJP-VariableFont_wght.ttf';

ffmpeg()
  .input('color=blue:size=1280x720:rate=25')
  .inputFormat('lavfi')
  .duration(5)
  .outputOptions([
    '-vf', `drawtext=text=''ヘロー'':fontcolor=white:fontsize=100:x=(w-tw)/2:y=(h-th)/2:fontfile='${fontPath}'`
  ])
  .on('end', () => {
    console.log('動画生成が完了しました。');
  })
  .on('error', (err) => {
    console.error('エラーが発生しました: ' + err.message);
  })
  .save('output.mp4');