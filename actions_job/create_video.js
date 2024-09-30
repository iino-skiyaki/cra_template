const ffmpeg = require('@ffmpeg.wasm/main');
const fs = require('fs');

// Initialize ffmpeg.wasm
const createHelloWorldVideo = async () => {
  await ffmpeg.load();

  // Input text file for ffmpeg
  const textContent = `
    [0:v]
    drawtext=text='HelloWorld':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=(h-text_h)/2:duration=5
  `;
  
  // Create an empty 5 second video with 'HelloWorld' text
  ffmpeg.FS('writeFile', 'text.txt', new TextEncoder().encode(textContent));
  
  await ffmpeg.run(
    '-f', 'lavfi',
    '-i', 'color=c=blue:s=640x360:d=5',
    '-vf', "drawtext=text='HelloWorld':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=(h-text_h)/2",
    '-t', '5',
    'helloWorld.mp4'
  );

  const data = ffmpeg.FS('readFile', 'helloWorld.mp4');
  fs.writeFileSync('./helloWorld.mp4', Buffer.from(data));
};

createHelloWorldVideo();
