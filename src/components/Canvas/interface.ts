export interface canvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  playing: Boolean;
  analyzer: AnalyserNode | undefined;
}
