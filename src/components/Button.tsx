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
  width: 100%;
  border: none;
  padding: 0.9rem 2.2rem;
  color: #f9f9f9;
  background: ${(props) => props.color};
  font-size: 1.5rem;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.3s all;
  font-family: 'Pretendard-Bold';
  &:hover,
  &:active {
    transform: scale(1.02);
  }

  &#list {
    margin: 10px 0;
  }
`;
