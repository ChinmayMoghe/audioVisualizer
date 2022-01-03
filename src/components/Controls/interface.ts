export interface ControlsInterface {
  track: HTMLAudioElement | undefined;
  duration: number;
  playing: Boolean;
  changePlayState: Function;
  createAudioContext: Function;
}
