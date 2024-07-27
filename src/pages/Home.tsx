import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components';
import { ROUTES } from '../constants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h1 css={styles.title}>누가더쎔?</h1>
      <Button onClick={() => navigate(ROUTES.READY)}>게임시작</Button>
    </section>
  );
};

export default Home;

const styles = {
  title: css`
    font-size: 60px;
    text-align: center;
    padding-bottom: 2rem;
    font-family: 'RixYeoljeongdo';
    word-break: keep-all;
  `,
};
