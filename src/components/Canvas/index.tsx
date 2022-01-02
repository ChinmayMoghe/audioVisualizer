import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { canvasProps } from './interface';
import CanvasElement from './style';
const Canvas = (props: canvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
  const visualizerAnimationRef = useRef<number>(0);
  const { playing, analyzer, ...rest } = props;
  const [barWidth, setbarWidth] = useState(0);
  const barHeight = useRef<number>(0);
  useEffect(() => {
    if (barWidth === 0) {
      if (analyzer && canvasRef.current) {
        // set bar width if not set to any width
        setbarWidth(canvasRef.current.width / analyzer.frequencyBinCount);
      }
      if (canvasRef.current) {
        canvasCtx.current = canvasRef.current.getContext("2d");
      }
    }
  }, [analyzer]);
  useEffect(() => {
    const animate = () => {
      console.log('played');
      if (analyzer) {
        const dataArr = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(dataArr);
        drawVisualizer(analyzer.frequencyBinCount, barWidth, barHeight.current, dataArr);
        visualizerAnimationRef.current = requestAnimationFrame(animate);
      }
    };
    const drawVisualizer = (bufferLength: number, barWidth: number, barHeight: number, dataArr: Uint8Array) => {
      const ctx = canvasCtx.current;
      const canvas = canvasRef.current;
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bufferLength; i++) {
          let xpos = i * barWidth;
          barHeight = dataArr[i] * 2;
          ctx.fillStyle = "white"
          ctx.fillRect(xpos, canvas.height - barHeight, barWidth, barHeight);
        }
      }
    };
    if (playing) {
      console.log('is playing');
      animate();
    } else {
      cancelAnimationFrame(visualizerAnimationRef.current);
    }
  }, [playing]);
  return (<CanvasElement ref={canvasRef} {...rest} />)
};

export default Canvas;