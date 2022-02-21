import styled from 'styled-components';

export const Title = styled.div`
    font-size : 13vw;
    font-weight : 1000;
    margin-top: 1rem;
    margin-bottom : 2rem;
    text-align: center;
    font-family: "Pretendard-Black";
    word-break: keep-all;
`;

export const Text = styled.div`
    font-size : 3vw;
    margin-bottom : 1.5vh;
    text-align: center;
    font-family: "Pretendard-SemiBold";
    &#last {
        margin-bottom: 4vh;
    }
`;

export const Color = styled.span`
    color: #ff2e35;
`

export const Img = styled.div`
    text-align: center;
`