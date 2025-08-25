import { css } from '@emotion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../components';
import { GAME_CONFIG, ROUTES, STORAGE_KEY } from '../constants';
import { setItem } from '../utils';

const Ready = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!inputRef.current) return;

    const trimmedValue = inputRef.current.value.trim();
    if (trimmedValue.length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    setItem(STORAGE_KEY.NAME, trimmedValue);
    navigate(ROUTES.MODE);
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleStartClick();
    }
  };

  return (
    <section>
      <picture>
        <source srcSet="images/information_resize.webp" type="image/webp" />
        <img
          src="images/information_resize.png"
          width={36}
          height={36}
          alt="Important information icon"
          aria-hidden="true"
        />
      </picture>
      <h1 css={styles.gameTitle}>게임 설명</h1>
      <p css={styles.gameInstruction}>1. 주어진 시간 안에 문제를 해결합니다.</p>
      <p css={styles.gameInstruction}>2. 10라운드마다 난이도가 상승합니다.</p>
      <p css={styles.gameInstruction} id="last-instruction">
        3. 게임은 총
        <span css={styles.highlightedText}> {GAME_CONFIG.MAX_ROUND} ROUND</span>
        입니다.
      </p>
      <p css={styles.note} id="last-note">
        전투력은 자릿수가 높아지면 더 높게 측정됩니다.
      </p>
      <label css={styles.visuallyHiddenLabel} htmlFor="nickname">
        Nickname
      </label>
      <input
        css={styles.nicknameInput}
        id="nickname"
        ref={inputRef}
        aria-label="닉네임 입력"
        placeholder="닉네임을 입력하세요"
        onKeyDown={handleEnterKeyDown}
      />
      <Button color="secondary" onClick={handleStartClick}>
        시작
      </Button>
    </section>
  );
};

export default Ready;

const styles = {
  gameTitle: css`
    font-size: 32px;
    padding: 16px 0 24px 0;
    font-family: 'RixYeoljeongdo';
    word-break: keep-all;
  `,
  gameInstruction: css`
    font-size: 16px;
    text-align: center;
    &#last-instruction {
      padding-bottom: 16px;
    }
  `,
  visuallyHiddenLabel: css`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `,
  note: css`
    font-size: 14px;
    padding-bottom: 16px;
    text-align: center;
    color: darkblue;
  `,
  highlightedText: css`
    color: var(--primary);
  `,
  nicknameInput: css`
    border: 1px solid;
    border-radius: 12px;
    width: 240px;
    font-size: 16px;
    padding: 16px 40px 16px 14px;
    margin-bottom: 16px;
    font-weight: 600;
    &:focus {
      border-color: var(--secondary);
      box-shadow: 0 0 0 3px #01a8ff33;
    }
  `,
};
