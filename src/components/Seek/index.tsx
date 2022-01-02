import React, { Fragment, useEffect, useRef } from 'react';
import { useState } from 'react';
import { SeekProps } from './interface';
import { ProgressBar, Thumb, Track, ThumbIcon } from './style';


const Seek = ({ currentTime, duration, changeCurrentTime, stopAnimation, startAnimation }: SeekProps) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [previousDragVal, setPreviousDragVal] = useState(0);
  const trackThumb = {
    previousDragVal: 0,
    newProgressBarWidth: 0
  }
  const ThumbRef = useRef<HTMLDivElement>(null);
  const ProgressRef = useRef<HTMLDivElement>(null);
  const TrackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dragThumb = (ev: MouseEvent) => {
      ev.preventDefault();
      const dragXPos = ev.pageX;
      if (isMouseDown) {
        const thumb = ThumbRef.current;
        const progressBar = ProgressRef.current;
        const track = TrackRef.current;
        if (trackThumb.previousDragVal === 0) {
          trackThumb.previousDragVal = previousDragVal;
        }
        const thumbMoveDistance = (dragXPos - trackThumb.previousDragVal);
        if (progressBar && track && thumb) {
          let newProgressBarWidth = (progressBar.clientWidth + thumbMoveDistance);
          if (newProgressBarWidth < 0) {
            newProgressBarWidth = 0;
          } else if (newProgressBarWidth > track.clientWidth) {
            newProgressBarWidth = track.clientWidth;
          }
          thumb.style.left = `${newProgressBarWidth}px`;
          progressBar.style.width = `${newProgressBarWidth}px`;
          if (trackThumb.previousDragVal !== dragXPos) {
            trackThumb.previousDragVal = dragXPos;
          }
          if (trackThumb.newProgressBarWidth !== newProgressBarWidth) {
            trackThumb.newProgressBarWidth = newProgressBarWidth;
          }
        }
      }
    }
    const setThumbPosition = (ev: MouseEvent) => {
      ev.preventDefault();
      if (isMouseDown) {
        window.removeEventListener("mousemove", dragThumb);
        const track = TrackRef.current;
        if (track) {
          const xpos = trackThumb.newProgressBarWidth / track.clientWidth;
          changeCurrentTime(xpos * duration);
        }
        setMouseDown(false);
        trackThumb.previousDragVal = 0;
        startAnimation();
      }
    };
    window.addEventListener("mousemove", dragThumb);
    window.addEventListener("mouseup", setThumbPosition)
    return () => {
      window.removeEventListener("mouseup", setThumbPosition)
    };
  }, [isMouseDown]);
  const getProgress = () => {
    if (currentTime) {
      const completed = (currentTime / duration) * 100;
      return `${completed}%`;
    } else {
      return '0%';
    }
  };
  const goToTime: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!isMouseDown) {
      const clickedTarget = ev.currentTarget;
      const xpos = ((ev.pageX - clickedTarget.offsetLeft) / clickedTarget.clientWidth);
      changeCurrentTime(xpos * duration);
    }
  };
  const getDragStart: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    stopAnimation();
    setPreviousDragVal(ev.pageX);
    setMouseDown(true);
  };
  return (
    <Fragment>
      <Track id="track" ref={TrackRef} onClick={goToTime}>
        <ProgressBar ref={ProgressRef} id="progress-bar" width={getProgress()} />
        <Thumb ref={ThumbRef} id="thumb" left={getProgress()} onMouseDown={getDragStart}>
        </Thumb>
      </Track>
    </Fragment>
  );
};

export default Seek;