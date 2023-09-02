import styled from '@emotion/styled';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const Button = ({
  children,
  color = '#ff2e35',
  type = 'button',
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <ButtonWrapper color={color} type={type} {...props}>
    {children}
  </ButtonWrapper>
);

export default Button;

export const ButtonWrapper = styled.button`
  border: none;
  padding: 12px 24px;
  color: #f9f9f9;
  background: ${(props) => props.color};
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
