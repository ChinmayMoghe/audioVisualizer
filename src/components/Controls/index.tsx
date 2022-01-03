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
const Controls = ({ track, playing, changePlayState, duration, createAudioContext }: ControlsInterface) => {
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number>(0);
  const updatePlayState = () => {
    if (track?.currentTime) {
      setCurrentTime(track?.currentTime);
    }
    if (track?.ended) {
      changePlayState(false);
    }
    animationRef.current = startAnimation();
  };

  const playAction = () => {
    if (!track) return;
    if (playing) {
      track.pause();
      stopAnimation();
    } else {
      track.play();
      animationRef.current = startAnimation();
    };
    createAudioContext();
    changePlayState();
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
      <PlayButton onClick={playAction}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </PlayButton>
      <TimeStamp><span>{formatDuration(currentTime)}</span> / <span>{formatDuration(duration)}</span></TimeStamp>
      <Seek currentTime={currentTime} duration={duration} changeCurrentTime={changeCurrentTime} startAnimation={startAnimation} stopAnimation={stopAnimation} />
    </Container>
  );
};

export default Controls;
