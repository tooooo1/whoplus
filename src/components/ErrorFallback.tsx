import { css } from '@emotion/react';
import type { FallbackProps } from 'react-error-boundary';

import { ROUTES } from '../constants';
import { Button } from './Button';

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div css={styles.container}>
    <h2 css={styles.title}>문제가 발생했습니다</h2>
    <div css={styles.buttonGroup}>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
      <Button
        color="secondary"
        onClick={() => (window.location.href = ROUTES.HOME)}
      >
        홈으로
      </Button>
    </div>
  </div>
);

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  `,
  title: css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  `,
  buttonGroup: css`
    display: flex;
    gap: 12px;
  `,
};
