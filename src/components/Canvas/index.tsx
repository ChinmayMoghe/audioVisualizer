import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { canvasProps } from './interface';
import CanvasElement from './style';
const Canvas = (props: canvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
  const visualizerAnimationRef = useRef<number>(0);
  const { paused, analyzer, ...rest } = props;
  const [barWidth, setbarWidth] = useState(0);
  const barHeight = useRef<number>(0);
  useEffect(() => {
    if (barWidth === 0) {
      if (analyzer && canvasRef.current) {
        // set bar width if not set to any width
        setbarWidth((canvasRef.current.width / 2) / analyzer.frequencyBinCount);
      }
      if (canvasRef.current) {
        canvasCtx.current = canvasRef.current.getContext("2d");
      }
    }
  }, [analyzer]);
  useEffect(() => {
    const animate = () => {
      if (analyzer) {
        const dataArr = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(dataArr);
        drawVisualizer(analyzer.frequencyBinCount, barWidth, barHeight.current, dataArr);
        visualizerAnimationRef.current = requestAnimationFrame(animate);
      }
    };
    const getColor = (barHeight: number, idx: number) => {
      const [r, g, b] = [idx*barHeight/5,idx/4,barHeight/2];
      return `rgb(${r},${g},${b})`;
    }
    const drawVisualizer = (bufferLength: number, barWidth: number, barHeight: number, dataArr: Uint8Array) => {
      const ctx = canvasCtx.current;
      const canvas = canvasRef.current;
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bufferLength; i++) {
          let xpos = i * barWidth;
          barHeight = -(dataArr[i] * 2 > canvas.height ? dataArr[i] * 2 - canvas.height / 2 : dataArr[i]);
          ctx.fillStyle = getColor(Math.abs(barHeight), i);
          ctx.fillRect((canvas.width / 2) + xpos, canvas.height, barWidth, barHeight);
        }
        for (let i = 0; i < bufferLength; i++) {
          let xpos = i * barWidth;
          barHeight = -(dataArr[i] * 2 > canvas.height ? dataArr[i] * 2 - canvas.height / 2 : dataArr[i]);
          ctx.fillStyle = getColor(Math.abs(barHeight), i);
          ctx.fillRect((canvas.width / 2) - xpos, canvas.height, barWidth, barHeight);
        }
      }
    };
    if (paused) {
      if (visualizerAnimationRef.current !== 0) {
        console.log("cancelled animation");
        cancelAnimationFrame(visualizerAnimationRef.current);
      }
    }
    animate();
  }, [paused, visualizerAnimationRef.current]);
  return (<CanvasElement ref={canvasRef} {...rest} />)
};

export default Canvas;