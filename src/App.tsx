import React, { useRef, useState, useEffect } from 'react';
import './App.css'
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import FeelGood from './assets/Syn Cole - Feel Good [NCS Release].webm';;

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtx = useRef<AudioContext>();
  const analyser = useRef<AnalyserNode>();
  const source = useRef<MediaElementAudioSourceNode>();
  const [track, setTrack] = useState<HTMLAudioElement>();
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState<Boolean>(false);
  useEffect(() => {
    if (track?.readyState && track?.readyState > 0) {
      // check if media is loaded and ready to play
      setDuration(track.duration);
    }
  }, [track?.readyState]);

  const createAudioContext = () => {
    if (!audioCtx.current && !analyser.current) {
      audioCtx.current = new window.AudioContext();
      analyser.current = audioCtx.current.createAnalyser();
    }
    if (!source.current) {
      if (audioRef.current) {
        source.current = audioCtx.current?.createMediaElementSource(audioRef.current);
        if (source.current && analyser.current && audioCtx.current) {
          source.current.connect(analyser.current);
          analyser.current.connect(audioCtx.current.destination);
        }
      }
    }
    console.log({ src: source.current, ctx: audioCtx.current, anly: analyser.current })
  };

  const loadedMetadata = () => {
    if (audioRef.current) {
      setTrack(audioRef.current);
    }
  };


  return (
    <div className="App">
      <audio ref={audioRef} src={FeelGood} preload="metadata" onLoadedMetadata={loadedMetadata} />
      <Canvas width={400} height={400} track={track} playing={playing} />
      <Controls track={track} playing={playing} setPlaying={setPlaying} duration={duration} createAudioContext={createAudioContext} />
    </div>
  )
}

export default App
