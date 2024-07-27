import { css } from '@emotion/react';

import { Button } from '../components';
import { MAX_ROUND, ROUTES, STORAGE_KEY } from '../constants';
import { getItem } from '../utils';

const End = () => {
  const round = getItem(STORAGE_KEY.ROUND, '1');
  const name = getItem(STORAGE_KEY.NAME, '1');
  const power = getItem(STORAGE_KEY.POWER, '1');

  const formattedPower = power.toLocaleString();

  const reset = () => {
    window.sessionStorage.clear();
    window.location.replace(ROUTES.HOME);
  };

  return (
    <section>
      <h1 css={styles.gameTitle}>누가더쎔?</h1>
      <h2 css={styles.gameRound}>
        ROUND <span css={styles.roundNumber}>{round}</span> / {MAX_ROUND}
      </h2>
      <p css={styles.playerName}>닉네임 : {name}</p>
      <div css={styles.powerDisplay}>
        <picture>
          <source srcSet="images/boxing-gloves_resize.webp" type="image/webp" />
          <img
            src="images/boxing-gloves_resize.png"
            width={36}
            height={36}
            alt="Boxing Gloves"
            aria-hidden="true"
          />
        </picture>
        <div>전투력</div>
        <div>{formattedPower}</div>
      </div>
      <Button onClick={reset}>다시하기</Button>
    </section>
  );
};

export default End;

const styles = {
  gameTitle: css`
    font-size: 32px;
    padding: 16px 0 24px 0;
    font-family: 'RixYeoljeongdo';
    word-break: keep-all;
  `,
  gameRound: css`
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  `,
  roundNumber: css`
    color: #1bb749;
    text-align: center;
  `,
  playerName: css`
    font-size: 20px;
    padding-bottom: 16px;
    text-align: center;
  `,
  powerDisplay: css`
    font-size: 20px;
    width: 60%;
    margin: 0 auto;
    margin-bottom: 16px;
    text-align: center;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);
  `,
};
