import { css } from '@emotion/react';

export const Logo = () => (
  <a href="https://tooo1.tistory.com" target="_blank" rel="noopener noreferrer">
    <img
      css={style}
      src="images/il.jpg"
      alt="tooooo1 Blog Logo"
      width={50}
      height={50}
    />
  </a>
);

const style = css`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  border-radius: 100px;
`;
