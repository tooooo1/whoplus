import styled from 'styled-components';

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

export const Round = styled.span`
    padding: 1vh;
    font-weight: initial;
    font-size: 3vh;
    font-family: "Pretendard-SemiBold";
    text-align: center;
`;

export const SubMissionQuestion = styled.div`
    font-size: 7vw;
    font-family: "Pretendard-SemiBold";
`;

export const SubMissionInput = styled.input`
    opacity: 0.6;
    border-radius: 10px;
    /* border: none; */
    padding: 1rem;
    margin: 1rem 0;
    width: 100%;
    font-family: "Pretendard-SemiBold";
    &:focus {
        outline : none;
    }
`;