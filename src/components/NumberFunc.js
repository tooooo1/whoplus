import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

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
    const inputRef = useRef(null);

    const reset = () => {
        setFirst(Math.ceil(Math.random() * 9));
        setSecond(Math.ceil(Math.random() * 9));
        inputRef.current.focus();
        setResult('');
        setTime(4);
    };
    
    const handleChange = (e) => {
        setValue(e.target.value);
        setResultAnswer('');
        
        if (parseInt(e.target.value) === first + second) {
            setResult('✅ Next Round');
            setRound(round + 1);
            setValue('');
            setTimeout(() => reset(), 1000);
        }
    };

    const tick = () => {
        if (time === 0 || time === '') {
            setTime('');
            setResult('❌ ' + value);
            setResultAnswer('✅ ' + (first + second));
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
            <SubMissionQuestion>{first} + {second}</SubMissionQuestion>
            <SubMissionInput ref={inputRef} value={value} onChange={handleChange} />
            <div>{time}</div>
            <div>{result}</div>  
            <div>{resultanswer}</div>
        </div>
    )
};

export default NumberFunc;