import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const fs = require('fs');

const ffmpeg = createFFmpeg({ log: true });

(async () => {
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'input.txt', new TextEncoder().encode('HelloWorld'));
  await ffmpeg.run('-f', 'lavfi', '-i', 'color=c=blue:s=1280x720:d=5', '-vf', 'drawtext=fontfile=/path/to/font.ttf:textfile=input.txt:fontcolor=white:fontsize=60:x=(w-text_w)/2:y=(h-text_h)/2', 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');
  fs.writeFileSync('hello_world.mp4', Buffer.from(data));
})();