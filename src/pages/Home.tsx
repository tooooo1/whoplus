import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { ROUTES } from '../constants/routes';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="home">
      <GameTitle>누가 더쎔?</GameTitle>
      <Button onClick={() => navigate(ROUTES.READY)}>게임시작</Button>
    </div>
  );
};

export default Home;

const GameTitle = styled.h1`
  font-size: 60px;
  text-align: center;
  padding-bottom: 2rem;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
`;
