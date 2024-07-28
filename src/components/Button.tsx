import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = ({
  children,
  color = 'primary',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button css={style(color)} color={color} type={type} {...props}>
    {children}
  </button>
);

const style = (color: string) => css`
  border: none;
  padding: 12px 24px;
  color: #f9f9f9;
  background: var(--${color});
  font-size: 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    transform: scale(1.02);
  }
`;
