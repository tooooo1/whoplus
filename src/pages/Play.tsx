import { css } from '@emotion/react';
import { useRef } from 'react';

import { LinearProgress } from '../components';
import { useGame } from '../hooks';

const Play = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, handleChange, progress, time } = useGame();

  const indicator = (() => {
    if (state.status === 'correct') return '🟢';
    if (state.status === 'wrong') return '🔴';
    return time;
  })();

  const barColor = (() => {
    return state.status === 'wrong' ? 'primary' : 'secondary';
  })();

  return (
    <section>
      <div css={styles.round}>
        ROUND <span css={styles.stage(state.active)}>{state.round}</span>
      </div>
      <p css={styles.timeUp}>{indicator}</p>
      <LinearProgress
        aria-label="remaining time"
        value={progress}
        barColor={barColor}
      />
      <div css={styles.subMissionQuestion}>
        {state.first} + {state.second}
      </div>
      <input
        css={styles.subMissionInput(state.status)}
        aria-label="answer input"
        ref={inputRef}
        value={state.value}
        onChange={handleChange}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <div css={styles.score(state.active)}>{state.power.toLocaleString()}</div>
    </section>
  );
};

export default Play;

const styles = {
  score: (active: boolean) => css`
    font-size: 12px;
    font-family: 'RixYeoljeongdo';
    animation: ${active && 'shake 0.3s infinite'};
    @keyframes shake {
      0% {
        transform: translate(0px, 120px) rotate(0deg) scale(6);
      }
      10% {
        transform: translate(-1px, -2px) rotate(-1deg) scale(5);
      }
      20% {
        transform: translate(-3px, 0px) rotate(1deg) scale(3);
      }
      30% {
        transform: translate(3px, 2px) rotate(0deg);
      }
      40% {
        transform: translate(1px, -1px) rotate(1deg) scale(1.4);
      }
      50% {
        transform: translate(-1px, 2px) rotate(-1deg);
      }
      60% {
        transform: translate(-3px, 1px) rotate(0deg);
      }
      70% {
        transform: translate(3px, 1px) rotate(-1deg);
      }
      80% {
        transform: translate(-1px, -1px) rotate(1deg);
      }
      90% {
        transform: translate(1px, 2px) rotate(0deg);
      }
      100% {
        transform: translate(1px, -2px) rotate(-1deg);
      }
    }
  `,
  round: css`
    font-size: 36px;
    margin-bottom: 16px;
  `,
  subMissionQuestion: css`
    font-size: 48px;
    font-weight: 700;
  `,
  subMissionInput: (status: 'default' | 'correct' | 'wrong') => {
    const colorMap = {
      default: '#000000',
      correct: '#1bb749',
      wrong: '#ff2e35',
    };

    const backgroundMap = {
      default: '#f4f4f4',
      correct: '#c0f2cd',
      wrong: '#ffd2d7',
    };

    return css`
      width: 80%;
      border-radius: 30px;
      background: ${backgroundMap[status]};
      color: ${colorMap[status]};
      border: 2px solid ${colorMap[status]};
      text-align: center;
      font-size: 24px;
      padding: 10px;
      margin: 16px 0;
      font-weight: 700;
    `;
  },
  stage: (active: boolean) => css`
    animation: ${active && 'bounce 0.3s infinite ease'};
    font-weight: bold;
    @keyframes bounce {
      0% {
        transform: scale(1);
      }
      40% {
        transform: scale(0.4);
      }
      60% {
        transform: scale(1);
      }
      80% {
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }
  `,
  timeUp: css`
    padding-bottom: 4px;
    height: 25px;
    font-weight: bold;
  `,
};
