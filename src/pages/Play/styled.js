import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    background-color: #f2f2f2;
  }
`;

export const Title = styled.div`
    font-size : 10vh;
    font-weight : 1000;
    margin : 2rem 0;
    text-align: center;
    font-family: "Pretendard-Black";
`;

export const Text = styled.div`
    font-size : 2vw;
    margin-bottom : 1.5rem;
    text-align: center;
    font-family: "Pretendard-SemiBold";
`;

export const Round = styled.div`
    font-weight: initial;
    font-size: 3vh;
    margin : 2rem 0;
    font-family: "Pretendard-SemiBold";
    text-align: center;
`;

export const SubMissionQuestion = styled.div`
    font-size: 7vw;
    font-family: "Pretendard-SemiBold";
    text-align: center;
    background-color: #ffffff;
`;

export const SubMissionInput = styled.input`
    opacity: 0.6;
    border-radius: 30px;
    background: ${(props) => props.background};
    color: ${(props) => props.color};
    border: 2px solid ${(props) => props.bordercolor};
    padding: 1rem;
    margin: 1rem 0;
    width: 100%;
    font-family: "Pretendard-SemiBold";
    &:focus {
        outline : none;
    }
`;

export const QuestionWrapper = styled.div`
    padding: 10vw;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
`

export const RoundWrapper = styled.div`
    border-radius: 10px;
    margin-bottom: 5vh;
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