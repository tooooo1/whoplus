import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f2f2f2;
  }
  #root>div {
      width: 80%;

      @media only screen and (min-width: 768px) {
        width: 70%;
    }
  }
`;

export const Title = styled.div`
    font-size : 8vw;
    margin-top: 1rem;
    margin-bottom : 1.5rem;
    text-align: center;
    font-family: "RixYeoljeongdo_Regular";
    word-break: keep-all;
    @media only screen and (min-width: 768px) {
        font-size: 60px;
    }
`;

export const Text = styled.div`
    font-size : 3vw;
    margin-bottom : 1.5vh;
    text-align: center;
    font-family: "Pretendard-SemiBold";
    &#last {
        margin-bottom: 4vh;
    }
    @media only screen and (min-width: 768px) {
        font-size: 20px;
    }
`;

export const Color = styled.span`
    color: #ff2e35;
`

export const Img = styled.div`
    text-align: center;
`

export const ReadyInput = styled.input`
    border: 1px solid #474747;
    outline: none;
    border-radius: 12px;
    line-height: 2rem;
    font-size: 1rem;
    padding: 10px 40px 10px 14px;
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    font-family: "Pretendard-Medium";
`;

export const Wrapper = styled.div`
    padding: 10vw 0;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);

    @media (min-width: 768px) { 
        padding: 5vw 0;
     } 
`

export const InputWrapper = styled.div`
    padding: 1vh 14vw;

    @media only screen and (min-width: 768px) {
        width: 80%;
        text-align: center;
        margin: 0 auto;
    }
    @media (min-width: 991px) { 
        width: 80%;
        text-align: center;
        margin: 0 auto;
     } 
`