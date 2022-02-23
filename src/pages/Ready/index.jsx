import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { inputData } from '../../features/nicknameSlice';
import { useDispatch } from 'react-redux';
import { Positioner } from '../../components/Wrapper/styled'
import Button from '../../components/Button'
import * as Styled from './styled';
import { rountReset } from '../../features/roundSlice';
import { powerReset } from '../../features/powerSlice';
import { nicknameReset } from '../../features/nicknameSlice';
import { timeReset } from '../../features/timeSlice';

const Ready = () => {
    const imgUrl = "https://img.icons8.com/color/48/000000/box-important--v1.png"
    const [value, setValue] = useState('');
    const [login, setLogin] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    const loginClick = (e) => {
        if(value.trim().length === 0)
		{
			alert("닉네임을 입력해주세요.");
			setValue("");
			return;
        }
        
        setLogin(!login);
        dispatch(rountReset())
        dispatch(powerReset())
        dispatch(nicknameReset())
        dispatch(timeReset())
        dispatch(inputData(value));
        navigate("/play")
    }

    return (
        <Positioner>
            <Styled.GlobalStyle />
            <Styled.Wrapper>
                <Styled.Img><img src={imgUrl} alt='!' /></Styled.Img>
                <Styled.Title>게임 설명</Styled.Title>

                <Styled.Text>1. 주어진 시간 안에 문제를 해결합니다.</Styled.Text>
                <Styled.Text>2. 10라운드마다 난이도가 상승합니다.</Styled.Text>
                <Styled.Text id='last'>3. 게임은 총<Styled.Color> 50 ROUND</Styled.Color>입니다.</Styled.Text>
                <Styled.InputWrapper>
                    <Styled.ReadyInput onChange={(e) => setValue(e.target.value)} placeholder="닉네임을 입력하세요"/>
                    <Button color="#01a8ff" onClick={loginClick}>시작</Button>
                </Styled.InputWrapper>
            </Styled.Wrapper>
        </Positioner>
    )
};

export default Ready;