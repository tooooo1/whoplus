import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9;
  }
`;

export const Title = styled.div`
    font-size : 10vh;
    font-weight : 1000;
    margin-bottom : 2rem;
    text-align: center;
    font-family: "Pretendard-Black";
    word-break: keep-all;
`;
