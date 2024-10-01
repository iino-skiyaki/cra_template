import { registerRoot, Composition } from 'remotion';
import React from 'react';
import { render } from 'react-dom';

// HelloWorldコンポーネント
const HelloWorld = () => {
  return (
    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 100 }}>
      Hello World
    </div>
  );
};

// Remotionビデオの登録
const RemotionVideo = () => {
  return (
    <Composition
      id="HelloWorld"
      component={HelloWorld}
      durationInFrames={120} // 2秒間（30fpsの場合）
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

// エントリーポイント
registerRoot(RemotionVideo);

// レンダリング
const renderVideo = async () => {
  await render(<RemotionVideo />, document.getElementById('root'));
};

renderVideo();
