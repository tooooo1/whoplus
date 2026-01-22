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

const Play = ({ mode = 'Dementia' }: { mode?: GameMode }) => {
  const { state, handleChange, progress } = useGame({ mode });

  const indicator = (() => {
    if (state.status === GAME_STATUS.CORRECT) return GAME_INDICATORS.CORRECT;
    if (state.status === GAME_STATUS.WRONG) return GAME_INDICATORS.WRONG;
    return state.time;
  })();

  const barColor = state.status === GAME_STATUS.WRONG ? 'primary' : 'secondary';

  return (
    <section>
      <div css={styles.round}>
        ROUND <span css={styles.stage(state.active)}>{state.round}</span>
      </div>
      <p css={styles.timeUp}>{indicator}</p>
      <LinearProgress value={progress} barColor={barColor} />
      <div css={styles.subMissionQuestion}>
        {state.first} + {state.second}
      </div>
      <input
        css={styles.subMissionInput(state.status)}
        aria-label="answer input"
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

export const PlayBrain = () => <Play mode="Brain" />;

const styles = {
  score: (active: boolean) => css`
    font-size: 12px;
    font-family: 'RixYeoljeongdo';
    animation: ${active ? `${shake} 0.3s infinite` : 'none'};
  `,
  round: css`
    font-size: 36px;
    margin-bottom: 16px;
  `,
  subMissionQuestion: css`
    font-size: 48px;
    font-weight: 700;
  `,
  subMissionInput: (status: (typeof GAME_STATUS)[keyof typeof GAME_STATUS]) => {
    const statusKey = status.toUpperCase() as keyof typeof GAME_COLORS.STATUS;

    return css`
      width: 80%;
      border-radius: 30px;
      background: ${GAME_COLORS.BACKGROUND[statusKey]};
      color: ${GAME_COLORS.STATUS[statusKey]};
      border: 2px solid ${GAME_COLORS.STATUS[statusKey]};
      text-align: center;
      font-size: 24px;
      padding: 10px;
      margin: 16px 0;
      font-weight: 700;
    `;
  },
  stage: (active: boolean) => css`
    animation: ${active ? `${bounce} 0.3s infinite ease` : 'none'};
    font-weight: bold;
  `,
  timeUp: css`
    padding-bottom: 4px;
    height: 25px;
    font-weight: bold;
  `,
};
