import { css } from '@emotion/react';

import { LinearProgress } from '../components';
import {
  GAME_COLORS,
  GAME_INDICATORS,
  GAME_STATUS,
  type GameMode,
} from '../constants';
import { useGame } from '../hooks';
import { bounce, shake } from '../styles/animations';

const getStatusIndicator = (
  status: (typeof GAME_STATUS)[keyof typeof GAME_STATUS],
  remainingTime: number,
): string | number => {
  if (status === GAME_STATUS.CORRECT) return GAME_INDICATORS.CORRECT;
  if (status === GAME_STATUS.WRONG) return GAME_INDICATORS.WRONG;
  return remainingTime;
};

const getProgressBarColor = (
  status: (typeof GAME_STATUS)[keyof typeof GAME_STATUS],
): 'primary' | 'secondary' =>
  status === GAME_STATUS.WRONG ? 'primary' : 'secondary';

const Play = ({ mode = 'Dementia' }: { mode?: GameMode }) => {
  const { state, handleAnswerInput, timeProgress } = useGame({ mode });

  const statusIndicator = getStatusIndicator(state.status, state.time);
  const progressBarColor = getProgressBarColor(state.status);

  return (
    <section>
      <div css={styles.roundDisplay}>
        ROUND{' '}
        <span css={styles.roundNumber} data-animating={state.isScoreAnimating}>
          {state.round}
        </span>
      </div>
      <p css={styles.statusIndicator}>{statusIndicator}</p>
      <LinearProgress value={timeProgress} barColor={progressBarColor} />
      <div css={styles.mathProblem}>
        {state.first} + {state.second}
      </div>
      <input
        css={styles.answerInput}
        data-status={state.status}
        aria-label="answer input"
        value={state.value}
        onChange={handleAnswerInput}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <div css={styles.powerScore} data-animating={state.isScoreAnimating}>
        {state.power.toLocaleString()}
      </div>
    </section>
  );
};

export default Play;

export const PlayBrain = () => <Play mode="Brain" />;

const styles = {
  powerScore: css`
    font-size: 12px;
    font-family: 'RixYeoljeongdo';

    &[data-animating='true'] {
      animation: ${shake} 0.3s infinite;
    }
  `,
  roundDisplay: css`
    font-size: 36px;
    margin-bottom: 16px;
  `,
  roundNumber: css`
    font-weight: bold;

    &[data-animating='true'] {
      animation: ${bounce} 0.3s infinite ease;
    }
  `,
  mathProblem: css`
    font-size: 48px;
    font-weight: 700;
  `,
  answerInput: css`
    width: 80%;
    border-radius: 30px;
    text-align: center;
    font-size: 24px;
    padding: 10px;
    margin: 16px 0;
    font-weight: 700;

    background: ${GAME_COLORS.BACKGROUND.DEFAULT};
    color: ${GAME_COLORS.STATUS.DEFAULT};
    border: 2px solid ${GAME_COLORS.STATUS.DEFAULT};

    &[data-status='correct'] {
      background: ${GAME_COLORS.BACKGROUND.CORRECT};
      color: ${GAME_COLORS.STATUS.CORRECT};
      border-color: ${GAME_COLORS.STATUS.CORRECT};
    }

    &[data-status='wrong'] {
      background: ${GAME_COLORS.BACKGROUND.WRONG};
      color: ${GAME_COLORS.STATUS.WRONG};
      border-color: ${GAME_COLORS.STATUS.WRONG};
    }
  `,
  statusIndicator: css`
    padding-bottom: 4px;
    height: 25px;
    font-weight: bold;
  `,
};
