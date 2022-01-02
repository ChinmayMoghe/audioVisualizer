import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { canvasProps } from './interface';
import CanvasElement from './style';
const Canvas = (props: canvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { track, playing, ...rest } = props;
  const visualizerAnimationRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode>();
  const audioContextRef = useRef<AudioContext>();
  const audioSourceRef = useRef<MediaElementAudioSourceNode>();
  const [barWidth, setbarWidth] = useState(0);
  const barHeight = useRef(0);
  const draw = (ctx: CanvasRenderingContext2D) => { };
  return (<CanvasElement ref={canvasRef} {...rest} />)
};

export default Canvas;