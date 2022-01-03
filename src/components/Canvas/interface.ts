export interface canvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  paused: Boolean | undefined;
  analyzer: AnalyserNode | undefined;
}
