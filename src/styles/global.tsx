import './reset.css';
import './fonts/font.css';

import { css, Global } from '@emotion/react';

export const global = (
  <Global
    styles={css`
      body {
        height: 100%;
      }
      * {
        outline: none;
        box-sizing: border-box;
      }
      html {
        height: 100%;
      }
      #root {
        background-color: #f2f2f2;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Pretendard-SemiBold', sans-serif;

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
