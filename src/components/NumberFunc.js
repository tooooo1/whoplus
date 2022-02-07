import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const NumberFunc = () => {
    const [time, setTime] = useState(4);
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [resultanswer, setResultAnswer] = useState('');
    const [round, setRound] = useState(1);
    const [show, setShow] = useState(true);
    const inputRef = useRef(null);

    const next = () => {
        setShow(true);
        setFirst(Math.ceil(Math.random() * 9));
        setSecond(Math.ceil(Math.random() * 9));
        inputRef.current.focus();
        setResult('');
        setRound(round + 1);
        setTime(4);
        
    };
    
    const handleChange = (e) => {
        setValue(e.target.value);
        setResultAnswer('');
        
        if (parseInt(e.target.value) === first + second) {
            setShow(false);
            setResult('✅ 정답');
            setValue('');
            setTime('');
            setTimeout(() => next(), 1000);
        }
    };

    const navigate = useNavigate();

    const tick = () => {
        if (time === 0 || time === '') {
            setShow(false);
            setTime('');
            setResult('❌ ' + value);
            setResultAnswer('✅ ' + (first + second));
            setTimeout(() => {
                navigate('end');
            }, 2000);
        }
        else {
            setTime(time - 1);
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
            <div>{time}</div>
            <div>{result}</div>  
            <div>{resultanswer}</div>
        </div>
    )
};

export default NumberFunc;