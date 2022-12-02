import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button.jsx';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="home">
      <Title>누가 더쎔?</Title>
      <Button color="#ff2e35" onClick={() => navigate('/ready')}>
        게임시작
      </Button>
    </div>
  );
};

export default Home;

const Title = styled.h1`
  font-size: 8vh;
  text-align: center;
  padding-bottom: 2rem;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
`;
