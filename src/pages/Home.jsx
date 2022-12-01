import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button.jsx';
import { nicknameReset } from '../features/nicknameSlice.js';
import { powerReset } from '../features/powerSlice.js';
import { roundReset } from '../features/roundSlice.js';
import { timeReset } from '../features/timeSlice.js';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(roundReset());
    dispatch(powerReset());
    dispatch(nicknameReset());
    dispatch(timeReset());
    navigate('/ready');
  };

  return (
    <div>
      <Title>누가 더쎔?</Title>
      <Button color="#ff2e35" onClick={() => onClick()}>
        게임시작
      </Button>
    </div>
  );
};

export default Home;

export const Title = styled.div`
  font-size: 8vh;
  padding-bottom: 2rem;
  font-family: 'RixYeoljeongdo_Regular';
  word-break: keep-all;
`;
