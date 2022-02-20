import React, { useState, useEffect, useRef } from 'react';
import { Positioner } from '../../components/Wrapper/styled'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../features/roundSlice';
import { incrementTime } from '../../features/timeSlice';
import * as Styled from './styled';
import LinearProgress from '@mui/material/LinearProgress';

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let difficulty = 10;

const Play = () => {
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
            if (round % 10 === 0) difficulty *= 10;
            if (round % 10 === 9) dispatch(incrementTime());
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
                navigate('../end');
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
            if (round % 10 !== 0) {
                var temp = 100 / time;
            } else {
                temp = 100 / (time-5);
            }
                if (oldProgress >= 100) return 0;
                return oldProgress + temp;
            });
        }, 1000);
        return () => {
            clearInterval(buffertimer);
        };
    });
    

    return (
        <Positioner>
            <Styled.Title>게임 설명</Styled.Title>
            <Styled.Round> ROUND {round} </Styled.Round>
            <LinearProgress variant="determinate" value={progress}
                color="inherit" sx={{ borderRadius: '10px', marginBottom:'2rem', height: '0.7vh' }}/>

            <div>
                <Styled.SubMissionQuestion>{first} + {second}</Styled.SubMissionQuestion>
                <Styled.SubMissionInput ref={inputRef} value={value} onChange={handleChange} />
            </div>
            <Styled.Text>{timedown}</Styled.Text>
            <Styled.Text>{result}</Styled.Text>
            <Styled.Text>{resultanswer}</Styled.Text>
        </Positioner>
    )
};

export default Play;