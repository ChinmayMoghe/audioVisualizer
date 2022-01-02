export interface canvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  track: HTMLAudioElement | undefined;
  playing: Boolean;
}
