export interface ProgressBarProps {
  width: string;
}
export interface ThumbProps {
  left: string;
}
export interface SeekProps {
  currentTime: number | undefined;
  duration: number;
  changeCurrentTime: Function;
  stopAnimation: Function;
  startAnimation: Function;
}
