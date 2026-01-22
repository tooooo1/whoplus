import { css } from '@emotion/react';

interface LinearProgressProps {
  value: number;
  barColor: 'primary' | 'secondary';
}

export const LinearProgress = ({ value, barColor }: LinearProgressProps) => (
  <div
    css={styles.progressContainer}
    role="progressbar"
    aria-valuenow={Math.round(value)}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label="게임 진행률"
  >
    <div css={styles.progressTrack}>
      <div
        css={styles.progressBar}
        data-color={barColor}
        style={{ width: `${String(value)}%` }}
      />
    </div>
  </div>
);

const styles = {
  progressContainer: css`
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;
  `,
  progressTrack: css`
    width: 100%;
    height: 1.2vh;
    background-color: lightgray;
    border-radius: 10px;
    overflow: hidden;
  `,
  progressBar: css`
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
    background-color: var(--secondary);

    &[data-color='primary'] {
      background-color: var(--primary);
    }
  `,
};
