import { css } from '@emotion/react';
import { NavLink } from 'react-router';

import { Button } from '../components';
import { ROUTES } from '../constants';

const Home = () => (
    <section>
      <h1 css={styles.title}>누가더쎔?</h1>
      <Button asChild>
        <NavLink to={ROUTES.READY}>게임시작</NavLink>
      </Button>
    </section>
  );

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
