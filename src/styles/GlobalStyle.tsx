import './reset.css';
import './fonts/font.css';

import { css, Global } from '@emotion/react';

export const GlobalStyle = () => (
  <Global
    styles={css`
      body {
        height: 100%;
      }
      html {
        height: 100%;
        font-family: 'Pretendard-SemiBold', sans-serif;
      }
      #root {
        background-color: #f2f2f2;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & > section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }
      }
    `}
  />
);
