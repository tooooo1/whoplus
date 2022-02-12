import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../features/roundSlice';
import { incrementTime } from '../features/timeSlice';
import LinearProgress from '@mui/material/LinearProgress';

const SubMissionInput = styled.input`
    opacity: 0.6;
    border-radius: 10px;
    border: none;
    padding: 1rem;
    margin: 1rem 0;
    width: 70%;
    &:focus {
        outline : none;
    }
`;

const SubMissionRound = styled.div`
    padding-bottom: 4rem;
    font-weight: initial;
    font-size: 1.2rem;
`;

const SubMissionQuestion = styled.div`
    font-size: 7vw;
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
    const [progress, setProgress] = useState(0);
    
    const [result, setResult] = useState('');
    const [resultanswer, setResultAnswer] = useState('');
    // const [totaltime, setTotaltime] = useState(0);
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
            setProgress(0);
            setValue('');
            setTimedown('');
            dispatch(increment());
            if (round % 5 === 0) difficulty *= 10;
            if (round % 5 === 4) dispatch(incrementTime());
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
            // setTotaltime(totaltime + 1);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => tick(), 1000);
        return () => clearInterval(timer);
    })


    useEffect(() => {
        const buffertimer = setInterval(() => {
            setProgress((oldProgress) => {
                const temp = 100 / time;
                if (oldProgress >= 100) return 0;
                return oldProgress + temp;
            });
        }, 1000);
        return () => {
            clearInterval(buffertimer);
        };
    });
    
    

    return (
        <div>
            <SubMissionRound> ROUND {round} </SubMissionRound>
            <LinearProgress variant="determinate" value={progress}
                color="inherit" sx={{ borderRadius: '10px', marginBottom:'2rem', height: '0.7vh' }}/>
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