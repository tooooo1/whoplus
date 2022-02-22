import React, { useState, useEffect, useRef } from 'react';
import { Positioner } from '../../components/Wrapper/styled'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../features/roundSlice';
import { incrementTime } from '../../features/timeSlice';
import * as Styled from './styled';
import LinearProgress from '@mui/material/LinearProgress';
import { powerup } from '../../features/powerSlice';

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let difficulty = 10;

const Play = () => {
    const round = useSelector((state) => state.round.value);
    const time = useSelector((state) => state.time.value);
    const dispatch = useDispatch();

    const [timeActive, setTimeActive] = useState(false);
    const [active, setActive] = useState(false);
    const [timedown, setTimedown] = useState(time);
    const [first, setFirst] = useState(rand(difficulty/10,difficulty));
    const [second, setSecond] = useState(rand(difficulty/10,difficulty));
    const [value, setValue] = useState('');
    const [progress, setProgress] = useState(0);

    const [inputcolor, setInputColor] = useState('#000000');
    const [inputbackgroundcolor, setInputBackgroundColor] = useState('#f4f4f4');
    const [inputbordercolor, setInputBorderColor] = useState('#000000');
    const inputRef = useRef(null);


    const next = () => {
        setValue('');
        setInputColor('#000000');
        setInputBackgroundColor('#f4f4f4');
        setInputBorderColor('#000000');
        setFirst(rand(difficulty/10,difficulty));
        setSecond(rand(difficulty/10,difficulty));
        inputRef.current.focus();
        setTimedown(time);
    };
    
    const handleChange = (e) => {
        setValue(e.target.value);

        if (round === 50) {
            if (parseInt(e.target.value) === first + second) {
                dispatch(powerup(Math.floor(first + second / difficulty)));
                setInputColor('#1bb749');
                setInputBackgroundColor('#c0f2cd');
                setInputBorderColor('#1bb749');
                setTimeout(() => {
                    navigate('../end');
                }, 2000);
            }
        } else {
            if (parseInt(e.target.value) === first + second) {
                setProgress(0);
                setActive(true);
                setTimeout(() => {
                    setActive(false);
                }, 100);
                setTimedown('');
                dispatch(powerup(Math.floor(first + second / difficulty)));
                dispatch(increment());
                setInputColor('#1bb749');
                setInputBackgroundColor('#c0f2cd');
                setInputBorderColor('#1bb749');
                if (round % 10 === 0) difficulty *= 10;
                if (round % 10 === 9) dispatch(incrementTime());
                setTimeout(() => next(), 1000);
            }
        }
    };

    const navigate = useNavigate();

    const tick = () => {
        if (timedown === 0 || timedown === '') {
            setTimedown('');
            setInputColor('#ff2e35');
            setInputBackgroundColor('#ffd2d7');
            setInputBorderColor('#ff2e35');
            setTimeout(() => {
                navigate('../end');
            }, 2000);
        }
        else {
            setTimedown(timedown - 1);
        };
    };


    useEffect(() => {
        const timer = setInterval(() => tick(), 1000);
        return () => clearInterval(timer);
    });

    

    useEffect(() => {
        const buffertimer = setInterval(() => {
            setProgress((oldProgress) => {
            setTimeActive(true);
            setTimeout(() => { 
                setTimeActive(false);
            }, 100);
            if (round % 10 !== 0) {
                var temp = 100 / time;
            } else {
                temp = 100 / (time-3);
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
            <Styled.GlobalStyle />
            <Styled.RoundWrapper>
                <Styled.Round> ROUND <Styled.Stage active={active}>{round}</Styled.Stage></Styled.Round>
                <LinearProgress variant="determinate" value={progress}
                color="success" sx={{ borderRadius: '10px', marginBottom:'2rem', height: '1vh' }}/>
            </Styled.RoundWrapper>
            

            <Styled.QuestionWrapper>
                <Styled.SubMissionQuestion>{first} + {second}</Styled.SubMissionQuestion>
                <Styled.SubMissionInput ref={inputRef} value={value}
                    onChange={handleChange}
                    color={inputcolor}
                    background={inputbackgroundcolor}
                    border={inputbordercolor}
                />
                <Styled.TimeUp active={timeActive}>{timedown}</Styled.TimeUp>
            </Styled.QuestionWrapper>
        </Positioner>
    )
};

export default Play;