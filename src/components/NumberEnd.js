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
    const time = useSelector((state) => state.time.value);
    return (
        <NumberWrapper>
            {/* <div> 이름 : 누구누구 </div> */}
            <SubMissionRound> ROUND {round} / 50 </SubMissionRound>
            {/* <div> 평균적으로 걸린 시간 : {time}</div> */}
            <AgainButton onClick={()=>window.location.replace("/")}>다시하기</AgainButton>
            <div style={{margin:"20px"}}> 공유하기 </div>
        </NumberWrapper>
)
};

export default NumberEnd;
