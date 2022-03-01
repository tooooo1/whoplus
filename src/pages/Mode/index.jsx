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
                <Styled.Img><img src="img/options.png" alt='options' width={50} /></Styled.Img>
                <Styled.Title>게임 모드</Styled.Title>

                <Styled.Text>치매예방</Styled.Text>
                <Styled.Text>학습</Styled.Text>
                <Styled.Text id='last'>3. 게임은 총<Styled.Color> 70 ROUND</Styled.Color>입니다.</Styled.Text>
                <Styled.Ex id='last'> 전투력은 자릿수가 높아지면 더 높게 측정됩니다.</Styled.Ex>
                <Styled.InputWrapper>
                    <Button color="#01a8ff" onClick={loginClick}>두뇌 회전</Button>
                    <Button color="#ff2e35" onClick={loginClick}>치매 예방</Button>
                </Styled.InputWrapper>
            </Styled.Wrapper>
        </Positioner>
    )
};

export default Ready;