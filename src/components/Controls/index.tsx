import React, { useEffect, useRef, useState } from 'react';
import { ControlsInterface } from './interface';
import {
  Container,
  PlayButton,
  TimeStamp,
  PlayIcon,
  PauseIcon,
} from './style';
import Seek from '../Seek';
const Controls = ({ track }: ControlsInterface) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number>(0);
  useEffect(() => {
    if (track?.readyState && track?.readyState > 0) {
      // check if media is loaded and ready to play
      setDuration(track.duration);
    }
  }, [track?.readyState]);

  const updatePlayState = () => {
    if (track?.currentTime) {
      setCurrentTime(track?.currentTime);
    }
    if (track?.ended) {
      setPlaying(false);
    }
    animationRef.current = startAnimation();
  };

  const changePlayState = () => {
    if (!track) return;
    if (playing) {
      track.pause();
      stopAnimation();
    } else {
      track.play();
      animationRef.current = startAnimation();
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
    if (track) {
      track.currentTime = time;
      setCurrentTime(time)
    }
  };

  const stopAnimation = () => cancelAnimationFrame(animationRef.current);
  const startAnimation = () => requestAnimationFrame(updatePlayState);

  return (
    <Container>
      <PlayButton onClick={changePlayState}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </PlayButton>
      <TimeStamp><span>{formatDuration(currentTime)}</span> / <span>{formatDuration(duration)}</span></TimeStamp>
      <Seek currentTime={currentTime} duration={duration} changeCurrentTime={changeCurrentTime} startAnimation={startAnimation} stopAnimation={stopAnimation} />
    </Container>
  );
};

export default Controls;
