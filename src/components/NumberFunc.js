import React, {useState, useRef} from 'react';
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
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [resultanswer, setResultAnswer] = useState('');
    const [round, setRound] = useState(1);
    const inputRef = useRef(null);
            
    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first + second) {
            setResult(value + ' 정답입니다.');
            setRound(round + 1);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult(value + '은 정답이 아니에요 ㅠ');
            setValue('');
            setRound(1);
            setResultAnswer('정답은 ' + (first+second) + '입니다.');
        }
    };
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <SubMissionRound> Round {round} </SubMissionRound>
            <SubMissionQuestion>{first} + {second}</SubMissionQuestion>
                <form onSubmit={onSubmitForm}>
                    <SubMissionInput ref={inputRef} value={value} onChange={onChangeInput} />
                    <button type="submit">입력</button>
                </form>
            <div id="result">{result}</div>  
            <div id="result">{resultanswer}</div>
        </div>
    )
};

export default NumberFunc;