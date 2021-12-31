import styled from 'styled-components';
import { ProgressBarProps, ThumbProps } from './interface';
import { FaCircle } from 'react-icons/fa';
import { showPointer } from '../../common/styles';

const TRACK_HEIGHT = '0.2rem';
const THUMB_HEIGHT = '2.5rem';

export const Track = styled.div`
  ${showPointer}
  position:relative;
  width: calc(100% - 30rem);
  height: ${TRACK_HEIGHT};
  border-radius: ${TRACK_HEIGHT};
  background-color: #ccc;
`;

export const Thumb = styled.div.attrs<ThumbProps>(({ left }) => ({
  style: {
    left: left ? left : 0,
  },
}))<ThumbProps>`
  ${showPointer}
  position:absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${THUMB_HEIGHT};
  height: ${THUMB_HEIGHT};
  background-color: purple;
  border-radius: 50%;
  top: calc((-50% + ((${TRACK_HEIGHT} - ${THUMB_HEIGHT}) / 2)));
`;

export const ThumbIcon = styled(FaCircle)`
  color: white;
  width: 0.1rem;
  height: 0.1rem;
`;

export const ProgressBar = styled.div.attrs<ProgressBarProps>(({ width }) => ({
  style: {
    width: width ? width : 0,
  },
}))<ProgressBarProps>`
  height: 100%;
  background-color: red;
`;
