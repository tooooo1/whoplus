import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components';
import { INITIAL_TIMES, ROUTES, STORAGE_KEY } from '../constants';
import type { GameMode } from '../reducers/gameReducer';
import { setItem } from '../utils';

const Mode = () => {
  const navigate = useNavigate();

  const modeChoice = (mode: GameMode) => {
    setItem(STORAGE_KEY.MODE, mode);
    navigate(ROUTES.PLAY);
  };

  return (
    <section>
      <picture>
        <source srcSet="images/options_resize.webp" type="image/webp" />
        <img
          src="images/options_resize.png"
          width={36}
          height={36}
          alt="Game mode options"
          aria-hidden="true"
        />
      </picture>
      <ModeTitle>게임 모드</ModeTitle>
      <Description>모드 선택에 따라 첫 시작 시간이 다릅니다.</Description>
      <Description id="last-instruction">난이도는 동일합니다.</Description>
      <Example>치매 예방 : {INITIAL_TIMES.DEMENTIA}초</Example>
      <Example>두뇌 회전 : {INITIAL_TIMES.BRAIN}초</Example>
      <ButtonWrapper>
        <Button onClick={() => modeChoice('Dementia')}>치매 예방</Button>
        <Button color="#01a8ff" onClick={() => modeChoice('Brain')}>
          두뇌 회전
        </Button>
      </ButtonWrapper>
    </section>
  );
};

export default Mode;

const ModeTitle = styled.h1`
  font-size: 32px;
  padding: 16px 0 24px 0;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
`;

const Description = styled.p`
  font-size: 16px;
  &#last-instruction {
    padding-bottom: 8px;
  }
`;

const Example = styled.p`
  font-size: 14px;
  text-align: center;
  color: darkblue;
`;

const ButtonWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  gap: 8px;
`;
