import styled from '@emotion/styled';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { ROUTES } from '../constants/routes';
import { STORAGE_KEY } from '../constants/storage';
import { setItem } from '../utils/storage';

const Ready = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!inputRef.current) return;

    const trimmedValue = inputRef.current.value.trim();
    if (trimmedValue.length === 0) {
      // eslint-disable-next-line no-alert
      alert('닉네임을 입력해주세요.');
      return;
    }

    setItem(STORAGE_KEY.NAME, trimmedValue);
    navigate(ROUTES.MODE);
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleStartClick();
    }
  };

  return (
    <div role="main">
      <img
        src="https://img.icons8.com/color/48/000000/box-important--v1.png"
        width={50}
        height={50}
        alt="Important information icon"
        aria-hidden="true"
      />
      <GameTitle>게임 설명</GameTitle>
      <GameInstruction>1. 주어진 시간 안에 문제를 해결합니다.</GameInstruction>
      <GameInstruction>2. 10라운드마다 난이도가 상승합니다.</GameInstruction>
      <GameInstruction id="last-instruction">
        3. 게임은 총<HighlightedText> 70 ROUND</HighlightedText>입니다.
      </GameInstruction>
      <Note id="last-note">전투력은 자릿수가 높아지면 더 높게 측정됩니다.</Note>
      <VisuallyHiddenLabel htmlFor="nickname">Nickname</VisuallyHiddenLabel>
      <NicknameInput
        id="nickname"
        autoFocus
        ref={inputRef}
        aria-label="닉네임 입력"
        placeholder="닉네임을 입력하세요"
        onKeyDown={handleEnterKeyDown}
      />
      <Button color="#01a8ff" onClick={handleStartClick}>
        시작
      </Button>
    </div>
  );
};

export default Ready;

const GameTitle = styled.h1`
  font-size: 32px;
  padding: 16px 0 24px 0;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
`;

const GameInstruction = styled.p`
  font-size: 16px;
  text-align: center;
  &#last-instruction {
    padding-bottom: 16px;
  }
`;

const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const Note = styled.p`
  font-size: 14px;
  padding-bottom: 16px;
  text-align: center;
  color: darkblue;
`;

const HighlightedText = styled.span`
  color: #ff2e35;
`;

const NicknameInput = styled.input`
  border: 1px solid #474747;
  border-radius: 12px;
  font-size: 16px;
  padding: 16px 40px 16px 14px;
  margin-bottom: 16px;
  font-family: 'Pretendard-SemiBold';
  &:focus {
    border-color: #01a8ff;
    box-shadow: 0 0 0 3px #01a8ff33;
  }
`;
