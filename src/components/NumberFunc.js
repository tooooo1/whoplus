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
    
    const handleChange = (e) => {
        setValue(e.target.value);
        setResultAnswer('')
        if (parseInt(e.target.value) === first + second) {
            setResult(e.target.value + ' 정답입니다.');
            setRound(round + 1);
            setValue('')
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            inputRef.current.focus();
        } else {
            setResult('❌ '+ e.target.value);
            setRound(1);
            setResultAnswer('✅ ' + (first+second));
        }
    };

    const tick = () => {
        if (time === 0) reset()
        else {
            setTime(time - 1);
        }
    };

    const reset = () => {
        setTime(4);
        
    };

    useEffect(() => {
        const timer = setInterval(() => tick(), 1000);
        return () => clearInterval(timer);
    })
    
    

    return (
        <div>
            <SubMissionRound> Round {round} </SubMissionRound>
            <SubMissionQuestion>{first} + {second}</SubMissionQuestion>
                <form>
                    <SubMissionInput ref={inputRef} value={value} onChange={handleChange} />
                </form>
            <div>{time}</div>
            <div>{result}</div>  
            <div>{resultanswer}</div>
        </div>
    )
};

export default NumberFunc;