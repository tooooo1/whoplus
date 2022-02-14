import React from 'react';
import { NumberWrapper, AgainButton } from '../components';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SubMissionRound = styled.div`
    padding: 2rem 0;
    font-weight: initial;
    font-size: 1.2rem;
`;

const NumberEnd = () => {
    const round = useSelector((state) => state.round.value);
    const nickname = useSelector((state) => state.nickname.value);
    return (
        <NumberWrapper>
            <SubMissionRound> ROUND {round} / 50 <p></p>닉네임 : {nickname} <p></p> {round}개? ㅋㅋ</SubMissionRound>
            
            
            <AgainButton onClick={()=>window.location.replace("/")}>다시하기</AgainButton>
            <div style={{margin:"20px"}}> 공유하기 </div>
        </NumberWrapper>
)
};

export default NumberEnd;
