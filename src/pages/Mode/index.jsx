import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Positioner } from '../../components/Wrapper/styled'
import Button from '../../components/Button'
import * as Styled from './styled';
import { rountReset } from '../../features/roundSlice';
import { powerReset } from '../../features/powerSlice';
import { nicknameReset } from '../../features/nicknameSlice';
import { timeReset } from '../../features/timeSlice';
import { brainChoice, dementiaChoice } from '../../features/versionSlice';

const Mode = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    

    const DementiaVersion = () => {
        dispatch(rountReset())
        dispatch(powerReset())
        dispatch(nicknameReset())
        dispatch(timeReset())

        dispatch(dementiaChoice())
        navigate("/play")
    }

    const BrainVersion = () => {
        dispatch(rountReset())
        dispatch(powerReset())
        dispatch(nicknameReset())
        dispatch(timeReset())

        dispatch(brainChoice())
        navigate("/play")
    }

    return (
        <Positioner>
            <Styled.GlobalStyle />
            <Styled.Wrapper>
                <Styled.Img><img src="img/options.png" alt='options' width={50} /></Styled.Img>
                <Styled.Title>게임 모드</Styled.Title>

                <Styled.Text>모드 선택에 따라 제한시간이 다릅니다.</Styled.Text>
                <Styled.Text>난이도는 동일합니다.</Styled.Text>
                <Styled.Ex id='last'> 치매 예방 : 5초 </Styled.Ex>
                <Styled.Ex id='last'> 두뇌 회전 : 3초 </Styled.Ex>
                <Styled.InputWrapper>
                    <Button color="#ff2e35" id="list" onClick={DementiaVersion}>치매 예방</Button>
                    <Button color="#01a8ff" id="list" onClick={BrainVersion}>두뇌 회전</Button>
                </Styled.InputWrapper>
            </Styled.Wrapper>
        </Positioner>
    )
};

export default Mode;