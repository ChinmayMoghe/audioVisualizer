import React, { useRef, useState, useEffect } from 'react';
import './App.css'
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import FeelGood from './assets/Syn Cole - Feel Good [NCS Release].webm';

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
    // call this function on click of a button, to create audio context
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
          analyser.current.fftSize = 128;
        }
      }
    }
  };

  const loadedMetadata = () => {
    if (audioRef.current) {
      setTrack(audioRef.current);
    }
  };

  const changePlayState = (state: Boolean) => {
    if (state !== undefined) {
      setPlaying(state);
    } else {
      setPlaying(prevPlayState => !prevPlayState);
    }
  }

  return (
    <div className="App">
      <audio ref={audioRef} src={FeelGood} preload="metadata" onLoadedMetadata={loadedMetadata} />
      <Canvas width={800} height={400} paused={track?.paused} analyzer={analyser.current} />
      <Controls track={track} playing={playing} changePlayState={changePlayState} duration={duration} createAudioContext={createAudioContext} />
    </div>
  )
}

export default App
