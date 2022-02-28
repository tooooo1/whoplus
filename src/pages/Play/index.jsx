import React, { useState, useEffect, useRef } from 'react';
import { Positioner } from '../../components/Wrapper/styled'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../features/roundSlice';
import { incrementTime } from '../../features/timeSlice';
import * as Styled from './styled';
import LinearProgress from '@mui/material/LinearProgress';
import { powerUp } from '../../features/powerSlice';
import { rountReset } from '../../features/roundSlice';
import { powerReset } from '../../features/powerSlice';
import { timeReset } from '../../features/timeSlice';
import { resultRound, resultPower, resultNick } from '../../features/resultSlice';

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let difficulty = 10;

const Play = () => {
    const round = useSelector((state) => state.round.value);
    const time = useSelector((state) => state.time.value);
    const power = useSelector((state) => state.power.value);
    const nickname = useSelector((state) => state.nickname.value);
    const dispatch = useDispatch();

    const [barcolor, setBarColor] = useState('success');
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

        if (round === 70) {
            if (parseInt(e.target.value) === first + second) {
                setProgress(0);
                setActive(true);
                setTimeout(() => {
                    setActive(false);
                }, 100);
                setTimedown(<img src="img/checked.png" alt='boxing' width={20} />);
                dispatch(powerUp(Math.floor(first + second / difficulty)));
                setInputColor('#1bb749');
                setInputBackgroundColor('#c0f2cd');
                setInputBorderColor('#1bb749');
                dispatch(resultNick(nickname));
                dispatch(resultPower(power));
                dispatch(resultRound(round));
                setTimeout(() => {
                    navigate('../end');
                }, 1000);
            }
        } else {
            if (parseInt(e.target.value) === first + second) {
                setProgress(0);
                setActive(true);
                setTimeout(() => {
                    setActive(false);
                }, 100);
                setTimedown(<img src="img/checked.png" alt='boxing' width={20} />);
                dispatch(powerUp(Math.floor(first + second / difficulty)));
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
        if (timedown === 0 || isNaN(timedown)) {
            setTimedown(<img src="img/remove.png" alt='boxing' width={20} />);
            setBarColor('secondary')
            setInputColor('#ff2e35');
            setInputBackgroundColor('#ffd2d7');
            setInputBorderColor('#ff2e35');

            dispatch(resultNick(nickname));
            dispatch(resultPower(power));
            dispatch(resultRound(round));


            setTimeout(() => {
                navigate('../end');
                dispatch(rountReset());
                dispatch(powerReset());
                dispatch(timeReset());
            }, 1000);
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
                temp = 100 / (time-2);
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
            <Styled.Wrapper>
                <Styled.QuestionWrapper>
                    <Styled.RoundWrapper>
                        <Styled.Round> ROUND <Styled.Stage active={active}>{round}</Styled.Stage></Styled.Round>
                        <Styled.TimeUp active={timeActive}>{timedown}</Styled.TimeUp>
                    <LinearProgress variant="determinate" value={progress}
                    color={barcolor} sx={{ borderRadius: '10px', marginBottom:'1.2rem', height: '1.2vh' }}/>
                </Styled.RoundWrapper>
                    <Styled.SubMissionQuestion>{first} + {second}</Styled.SubMissionQuestion>
                    <Styled.SubMissionInput ref={inputRef} value={value}
                        onChange={handleChange}
                        color={inputcolor}
                        background={inputbackgroundcolor}
                        border={inputbordercolor}
                        inputmode="numeric"
                        pattern="[0-9]*"
                    />
                    <Styled.Score active={active}>{ power.toLocaleString() }</Styled.Score>
                </Styled.QuestionWrapper>
            </Styled.Wrapper>
        </Positioner>
    )
};

export default Play;