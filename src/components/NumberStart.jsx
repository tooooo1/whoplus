import React, { useState, useRef } from 'react';
import {  useDispatch } from 'react-redux';
import { NumberWrapper, AgainButton } from '../components';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { inputData } from '../features/nicknameSlice';

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

const NumberStart = () => {
    const inputRef = useRef(null);
    const [nickname, setNickname] = useState('');
    const [next, setNext] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(inputData(nickname));
        setNext(true);
    }

    return (
        <NumberWrapper>
            {
                next === false ? (
                    <div>
            성함(닉네임)을 입력해주세요.
            <SubMissionInput ref={inputRef} value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <AgainButton onClick={() => handleClick()}>다음</AgainButton>
                    </div>) : 
                    <div>
                        게임 설명
                        <div>
                            시간 안에 해결한다.
                            <div>
                                10라운드마다 난이도 상승
                                <div>50라운드가 마지막</div>
                            </div>
                        </div>
                        <AgainButton onClick={() => navigate("/game")}>게임 시작</AgainButton>
                    </div>}
        </NumberWrapper>
)
};

export default NumberStart;
