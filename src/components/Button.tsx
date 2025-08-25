import { css } from '@emotion/react';
import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
  children: ReactNode;
  asChild?: boolean;
}

export const Button = ({
  children,
  color = 'primary',
  type = 'button',
  asChild,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp css={style(color)} color={color} type={type} {...props}>
      {children}
    </Comp>
  );
};

const style = (color: string) => css`
  border: none;
  padding: 16px 24px;
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
