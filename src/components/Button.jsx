import styled from '@emotion/styled';

const Button = ({ children, onClick, color, id }) => (
  <Wrapper onClick={onClick} color={color} id={id}>
    {children}
  </Wrapper>
);

export default Button;

export const Wrapper = styled.button`
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
    transform: scale(1.1);
  }

  &#list {
    margin: 10px 0;
  }

  @media only screen and (min-width: 536px) {
    width: 365px;
  }
`;
