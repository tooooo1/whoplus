import styled from '@emotion/styled';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { STORAGE_KEY } from '../constants/storage';
import { setItem } from '../utils/storage';

const Ready = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!inputRef.current) return;

    if (inputRef.current.value.trim().length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    setItem(STORAGE_KEY.NAME, inputRef.current.value.trim());
    navigate('/mode');
  };

  return (
    <div>
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

      <ReadyInput
        ref={inputRef}
        aria-label="닉네임 입력"
        placeholder="닉네임을 입력하세요"
      />
      <Button color="#01a8ff" onClick={handleStartClick}>
        시작
      </Button>
    </div>
  );
};

export default Ready;

const Title = styled.div`
  font-size: 8vw;
  padding: 1rem 0 1.5rem 0;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

const Text = styled.div`
  font-size: 3vw;
  line-height: 2rem;
  text-align: center;
  &#last {
    padding-bottom: 1rem;
  }
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Ex = styled.div`
  font-size: 3vw;
  padding-bottom: 1.5vh;
  text-align: center;
  color: darkblue;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

const Color = styled.span`
  color: #ff2e35;
`;

const ReadyInput = styled.input`
  border: 1px solid #474747;
  outline: none;
  border-radius: 12px;
  font-size: 1rem;
  padding: 1rem 40px 1rem 14px;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  font-family: 'Pretendard-SemiBold';

  @media only screen and (min-width: 536px) {
    width: 365px;
  }
`;
