export interface ControlsInterface {
  track: HTMLAudioElement | undefined;
  duration: number;
  playing: Boolean;
  setPlaying: Function;
  createAudioContext: Function;
}
