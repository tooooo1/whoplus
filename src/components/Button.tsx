import { css } from '@emotion/react';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const Button = ({
  children,
  color = '#ff2e35',
  type = 'button',
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button {...props} css={buttonStyle(color)} color={color} type={type}>
    {children}
  </button>
);

export default Button;

const buttonStyle = (color: string) => css`
  border: none;
  padding: 12px 24px;
  color: #f9f9f9;
  background: ${color};
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s all;
  font-family: 'Pretendard-Bold';
  &:hover {
    transform: scale(1.02);
  }
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;
