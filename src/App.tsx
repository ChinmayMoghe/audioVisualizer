import React, { useRef } from 'react';
import './App.css'
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import FeelGood from './assets/Syn Cole - Feel Good [NCS Release].webm';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState<HTMLAudioElement>();
  const draw = (ctx: CanvasRenderingContext2D) => { };

  const loadedMetadata = () => {
    if (audioRef.current) {
      setTrack(audioRef.current);
    }
  };

  return (
    <div className="App">
      <audio ref={audioRef} src={FeelGood} preload="metadata" onLoadedMetadata={loadedMetadata} />
      <Canvas draw={draw} width={400} height={400} />
      <Controls track={track} />
    </div>
  )
}

export default App
