import { css } from '@emotion/react';
import { NavLink } from 'react-router';

import { Button } from '../components';
import { INITIAL_TIMES, ROUTES } from '../constants';

const Mode = () => {
  return (
    <section>
      <picture>
        <source srcSet="images/options_resize.webp" type="image/webp" />
        <img
          src="images/options_resize.png"
          width={36}
          height={36}
          alt="Game mode options"
          aria-hidden="true"
        />
      </picture>
      <h1 css={styles.modeTitle}>게임 모드</h1>
      <p css={styles.description}>모드 선택에 따라 첫 시작 시간이 다릅니다.</p>
      <p css={styles.description} id="last-instruction">
        난이도는 동일합니다.
      </p>
      <p css={styles.example}>치매 예방 : {INITIAL_TIMES.DEMENTIA}초</p>
      <p css={styles.example}>두뇌 회전 : {INITIAL_TIMES.BRAIN}초</p>
      <div css={styles.buttonWrapper}>
        <Button asChild>
          <NavLink to={ROUTES.PLAY_DEMENTIA}>치매 예방</NavLink>
        </Button>
        <Button color="secondary" asChild>
          <NavLink to={ROUTES.PLAY_BRAIN}>두뇌 회전</NavLink>
        </Button>
      </div>
    </section>
  );
};

export default Mode;

const styles = {
  modeTitle: css`
    font-size: 32px;
    padding: 16px 0 24px 0;
    font-family: 'RixYeoljeongdo';
    word-break: keep-all;
  `,
  description: css`
    font-size: 16px;
    &#last-instruction {
      padding-bottom: 8px;
    }
  `,
  example: css`
    font-size: 14px;
    text-align: center;
    color: darkblue;
  `,
  buttonWrapper: css`
    padding-top: 16px;
    display: flex;
    gap: 8px;
  `,
};
