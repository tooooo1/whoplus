import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../features/roundSlice';
import { incrementTime } from '../features/timeSlice';

const SubMissionInput = styled.input`
    opacity: 0.6;
    border-radius: 10px;
    border: none;
    padding: 1rem;
    margin: 1rem;
    &:focus {
        outline : none;
    }
`;

const SubMissionRound = styled.div`
    padding-bottom: 4rem;
`;

const SubMissionQuestion = styled.div`
    font-size: 3.5rem;
`;

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let difficulty = 10;

const NumberFunc = () => {
    const round = useSelector((state) => state.round.value);
    const time = useSelector((state) => state.time.value);
    const dispatch = useDispatch();

    const [timedown, setTimedown] = useState(time);
    const [first, setFirst] = useState(rand(difficulty/10,difficulty));
    const [second, setSecond] = useState(rand(difficulty/10,difficulty));
    const [value, setValue] = useState('');
    
    const [result, setResult] = useState('');
    const [resultanswer, setResultAnswer] = useState('');
    const [show, setShow] = useState(true);
    const inputRef = useRef(null);
    
    const next = () => {
        setShow(true);
        setFirst(rand(difficulty/10,difficulty));
        setSecond(rand(difficulty/10,difficulty));
        inputRef.current.focus();
        setResult('');
        setTimedown(time);
    };
    
    const handleChange = (e) => {
        setValue(e.target.value);
        setResultAnswer('');
        
        if (parseInt(e.target.value) === first + second) {
            setShow(false);
            setResult('✅ 정답');
            setValue('');
            setTimedown('');
            dispatch(increment());
            if (round % 5 === 0) {
                dispatch(incrementTime());
                difficulty *= 10;
            }
            setTimeout(() => next(), 1000);
        }
    };

    const navigate = useNavigate();

    const tick = () => {
        if (timedown === 0 || timedown === '') {
            setShow(false);
            setTimedown('');
            setResult('❌ ' + value);
            setResultAnswer('✅ ' + (first + second));
            setTimeout(() => {
                navigate('end');
            }, 2000);
        }
        else {
            setTimedown(timedown - 1);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => tick(), 1000);
        return () => clearInterval(timer);
    })
    
    

    return (
        <div>
            <SubMissionRound> Round {round} </SubMissionRound>
            {
            show === true ? (
            <div>
                <SubMissionQuestion>{first} + {second}</SubMissionQuestion>
                <SubMissionInput ref={inputRef} value={value} onChange={handleChange} />
            </div>) : null
            }
            <div>{timedown}</div>
            <div>{result}</div>  
            <div>{resultanswer}</div>
        </div>
    )
};

export default NumberFunc;