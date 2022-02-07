import React from 'react';
import { NumberWrapper } from '../components';
import { useSelector } from 'react-redux';

const NumberEnd = () => {
    const round = useSelector((state) => state.round.value);
    const time = useSelector((state) => state.time.value);
    return (
    <NumberWrapper>
        <div> {round} </div>
        <div> {time}</div>
    </NumberWrapper>
)
};

export default NumberEnd;
