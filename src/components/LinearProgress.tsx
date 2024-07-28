import { css } from '@emotion/react';

interface LinearProgressProps {
  value: number;
  barColor: 'success' | 'failure';
}

export const LinearProgress = ({ value, barColor }: LinearProgressProps) => {
  const color = barColor === 'success' ? '#4caf50' : '#f44336';

  return (
    <div css={styles.progressContainer} role="progressbar">
      <div css={styles.progressTrack}>
        <div css={styles.progressBar(value, color)}></div>
      </div>
    </div>
  );
};

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
  progressBar: (value: number, color: string) => css`
    width: ${value}%;
    height: 100%;
    background-color: ${color};
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
  `,
};
