import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button.jsx';

const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
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
