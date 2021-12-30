import React, { useEffect, useRef, useState } from 'react';
import { AudioPlayerInterface } from './interface';
import {
  Container,
  PlayButton,
  TimeStamp,
  PlayIcon,
  PauseIcon,
} from './style';
import Seek from '../Seek';
const AudioPlayer = ({ track }: AudioPlayerInterface) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>(0);
  useEffect(() => {
    if (audioRef?.current?.readyState) {
      // check if media is loaded and ready to play
      const duration = audioRef.current.readyState > 0 ? audioRef.current.duration : 0;
      setDuration(duration);
    }
  }, [audioRef?.current?.readyState]);

  const updatePlayState = () => {
    if (audioRef.current?.currentTime) {
      setCurrentTime(audioRef.current?.currentTime);
    }
    animationRef.current = requestAnimationFrame(updatePlayState);
  };

  const changePlayState = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updatePlayState);
    };
    setPlaying((prevVal) => !prevVal);
  };

  const prefixZero = (num: number): string => num > 9 ? `${num}` : `0${num}`;

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${prefixZero(minutes)}:${prefixZero(seconds)}`
  }

  const changeCurrentTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time)
    }
  };

  return (
    <Container>
      <audio ref={audioRef} src={track} preload="metadata" />
      <PlayButton onClick={changePlayState}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </PlayButton>
      <TimeStamp><span>{formatDuration(currentTime)}</span> / <span>{formatDuration(duration)}</span></TimeStamp>
      <Seek currentTime={currentTime} duration={duration} changeCurrentTime={changeCurrentTime} />
    </Container>
  );
};

export default AudioPlayer;
