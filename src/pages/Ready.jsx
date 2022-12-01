import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button.jsx';
import { inputData, nicknameReset } from '../features/nicknameSlice.js';
import { powerReset } from '../features/powerSlice.js';
import { roundReset } from '../features/roundSlice.js';
import { timeReset } from '../features/timeSlice.js';

const Ready = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginClick = () => {
    if (value.trim().length === 0) {
      alert('닉네임을 입력해주세요.');
      setValue('');
      return;
    }

    dispatch(roundReset());
    dispatch(powerReset());
    dispatch(nicknameReset());
    dispatch(timeReset());
    dispatch(inputData(value));
    navigate('/mode');
  };

  return (
    <div>
      <Wrapper>
        <img
          src="https://img.icons8.com/color/48/000000/box-important--v1.png"
          width={48}
          height={48}
          alt="!"
        />
        <Title>게임 설명</Title>

        <Text>1. 주어진 시간 안에 문제를 해결합니다.</Text>
        <Text>2. 10라운드마다 난이도가 상승합니다.</Text>
        <Text id="last">
          3. 게임은 총<Color> 70 ROUND</Color>입니다.
        </Text>
        <Ex id="last"> 전투력은 자릿수가 높아지면 더 높게 측정됩니다.</Ex>
        <InputWrapper>
          <ReadyInput
            onChange={(e) => setValue(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
          <Button color="#01a8ff" onClick={loginClick}>
            시작
          </Button>
        </InputWrapper>
      </Wrapper>
    </div>
  );
};

export default Ready;

export const Title = styled.div`
  font-size: 8vw;
  padding: 1rem 0 1.5rem 0;
  font-family: 'RixYeoljeongdo_Regular';
  word-break: keep-all;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

export const Text = styled.div`
  font-size: 3vw;
  padding-bottom: 1.5vh;
  text-align: center;
  font-family: 'Pretendard-SemiBold';
  &#last {
    padding-bottom: 3vh;
  }
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const Ex = styled.div`
  font-size: 3vw;
  padding-bottom: 1.5vh;
  text-align: center;
  color: darkblue;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const Color = styled.span`
  color: #ff2e35;
`;

export const ReadyInput = styled.input`
  border: 1px solid #474747;
  outline: none;
  border-radius: 12px;
  font-size: 1rem;
  padding: 1rem 40px 1rem 14px;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  font-family: 'Pretendard-Medium';
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    padding: 5vw 0;
  }
`;

export const InputWrapper = styled.div`
  padding: 1vh 14vw;

  @media only screen and (min-width: 768px) {
    width: 80%;
    text-align: center;
    margin: 0 auto;
  }
  @media (min-width: 991px) {
    width: 80%;
    text-align: center;
    margin: 0 auto;
  }
`;
