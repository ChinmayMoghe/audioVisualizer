import styled from 'styled-components';
import {
  BsFillPlayFill,
  BsPauseFill,
} from 'react-icons/bs';
import { showPointer } from '../../common/styles';

export const Container = styled.div`
  // Remove borders
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 50px;
  width: calc(100% - 5rem);
  padding: 1rem 0.5rem;
`;

export const PlayButton = styled.button`
  ${showPointer}
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: purple;
  border:1px solid transparent;
`;

export const TimeStamp = styled.span`
  display: inline-block;
`;

export const PlayIcon = styled(BsFillPlayFill)`
  width: 2rem;
  height: 2rem;
  color:white;
`;
export const PauseIcon = styled(BsPauseFill)`
  width: 2rem;
  height: 2rem;
  color:white;
`;