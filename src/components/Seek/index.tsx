import React, { Fragment } from 'react';
import { SeekProps } from './interface';
import { ProgressBar, Thumb, Track, ThumbIcon } from './style';


const Seek = ({ currentTime, duration, changeCurrentTime }: SeekProps) => {
  const getProgress = () => {
    if (currentTime) {
      const completed = (currentTime / duration) * 100;
      return `${completed}%`;
    } else {
      return '0%';
    }
  };
  const goToTime = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedtarget = ev.target;
    if (clickedtarget.id === 'track') {
      const xpos = ((ev.pageX - ev.target.offsetLeft) / ev.target.clientWidth);
      changeCurrentTime(xpos * duration);
    } else if (clickedtarget.id === 'progress-bar') {
      const xpos = ((ev.pageX - ev.target.offsetParent.offsetLeft) / ev.target.offsetParent.clientWidth);
      changeCurrentTime(xpos * duration);
    }
  };
  return (
    <Fragment>
      <Track id="track" onClick={goToTime}>
        <ProgressBar id="progress-bar" width={getProgress()} />
        <Thumb id="thumb" left={getProgress()}>
          <ThumbIcon id="thumb-icon" />
        </Thumb>
      </Track>
    </Fragment>
  );
};

export default Seek;