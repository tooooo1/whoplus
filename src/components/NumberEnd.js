import React from 'react';
import { NumberWrapper } from '../components';
import { useSelector } from 'react-redux';

const NumberEnd = () => {
    const round = useSelector((state) => state.round.value);
    const time = useSelector((state) => state.time.value);
    return (
        <NumberWrapper>
            <div> 이름 </div>
            <div> 라운드 색깔 </div>
            <div> {round} </div>
            <div> 평균적으로 걸린 시간 : {time}</div>
            <div> 다시하기 </div>
            <div> 공유하기 </div>
        </NumberWrapper>
)
};

export default NumberEnd;
