import './reset.css';

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
      }

      #root > section {
        background-color: #ffffff;
        box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        border-radius: 12px;
        padding: 48px;

        &#home {
          background-color: #f2f2f2;
          box-shadow: none;
          padding: 0;
        }
      }
    `}
  />
);
