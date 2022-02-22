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
    font-size : 10vh;
    font-weight : 1000;
    margin : 2rem 0;
    text-align: center;
    font-family: "Pretendard-Black";
    @media only screen and (min-width: 768px) {
        font-size: 60px;
    }
`;

export const Text = styled.div`
    font-size : 2vw;
    margin-bottom : 1.5rem;
    text-align: center;
    font-family: "Pretendard-SemiBold";
    @media only screen and (min-width: 768px) {
        font-size: 30px;
    }
`;

export const Round = styled.div`
    font-weight: initial;
    font-size: 6vw;
    margin-bottom: 1rem;
    font-family: "Pretendard-SemiBold";
    text-align: center;
    @media only screen and (min-width: 768px) {
        font-size: 40px;
    }
`;

export const SubMissionQuestion = styled.div`
    font-size: 7vw;
    font-family: "Pretendard-ExtraBold";
    text-align: center;
    background-color: #ffffff;
`;

export const SubMissionInput = styled.input`
    opacity: 0.6;
    border-radius: 30px;
    background: ${(props) => props.background};
    color: ${(props) => props.color};
    text-align: center;
    font-size: 3vw;
    border: 2px solid ${(props) => props.bordercolor};
    padding: 0.8rem;
    margin: 1rem 0;
    width: 100%;
    font-family: "Pretendard-ExtraBold";
    &:focus {
        outline : none;
    }

    @media only screen and (min-width: 768px) {
        font-size: 25px;
    }
`;

export const QuestionWrapper = styled.div`
    padding: 6vh 12vh 10vh;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
`

export const RoundWrapper = styled.div`
`

export const Stage = styled.span`
    display: inline-block;
    animation: ${(props) => props.active && `bounce 0.3s infinite ease`};
    font-weight: bold;
    @keyframes bounce {
    0% {
        transform: scale(4);
    }
    40% {
        transform: scale(0.4);
    }
    60% {
        transform: scale(1.3);
    }
    80% {
        transform: scale(0.8);
    }
    100% {
        transform: scale(1);
    }
  }
`;

export const TimeUp = styled.div`
    display: block;
    text-align: center;
    background: #ffffff;
    animation: ${(props) => props.active && `bounce 0.3s infinite ease`};
    font-weight: bold;
    @keyframes bounce {
    0% {
        transform: scale(1.6);
    }
    40% {
        transform: scale(0.4);
    }
    60% {
        transform: scale(1.3);
    }
    80% {
        transform: scale(0.8);
    }
    100% {
        transform: scale(1);
    }
  }
`;

export const Wrapper = styled.div`
    padding: 10vw 0;

    @media (min-width: 768px) { 
        padding: 5vw 0;
     } 
`