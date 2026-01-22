import { css } from '@emotion/react';

export const Loading = () => (
  <div css={styles.container}>
    <div css={styles.spinner} />
  </div>
);

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  `,
  spinner: css`
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};
