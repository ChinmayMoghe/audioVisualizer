import React from 'react';
import './App.css'
import Canvas from './components/Canvas';
import AudioPlayer from './components/AudioPlayer';
import FeelGood from './assets/Syn Cole - Feel Good [NCS Release].webm';

function App() {
  const draw = (ctx:CanvasRenderingContext2D)=>{};
  return (
    <div className="App">
      <Canvas draw={draw} width={400} height={400}/>
      <AudioPlayer track={FeelGood}/>
    </div>
  )
}

export default App
