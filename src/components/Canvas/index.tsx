import React, { useRef} from 'react';
import { useEffect } from 'react';
import { canvasProps } from './interface';
import CanvasElement from './style';
const Canvas = (props:canvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {draw, ...rest} = props;
  useEffect(()=>{
    const canvas = canvasRef.current;
    if(canvas) {
      const context = canvas.getContext("2d");
    }
  },[]);
  return (<CanvasElement ref={canvasRef} {...rest}/>)
};

export default Canvas;