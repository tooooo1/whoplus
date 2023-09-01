import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { ROUTES } from '../constants/routes';
import { STORAGE_KEY } from '../constants/storage';
import { setItem } from '../utils/storage';

type GameMode = 'Dementia' | 'Brain';

const Mode = () => {
  const navigate = useNavigate();

  const modeChoice = (mode: GameMode) => {
    setItem(STORAGE_KEY.MODE, mode);
    navigate(ROUTES.PLAY);
  };

  return (
    <div>
      <img src="images/options.png" alt="options" width={50} height={50} />
      <ModeTitle>게임 모드</ModeTitle>

      <Description>모드 선택에 따라 첫 시작 시간이 다릅니다.</Description>
      <Description>난이도는 동일합니다.</Description>
      <Example>치매 예방 : 5초</Example>
      <Example>두뇌 회전 : 3초</Example>
      <Button id="list" onClick={() => modeChoice('Dementia')}>
        치매 예방
      </Button>
      <Button color="#01a8ff" id="list" onClick={() => modeChoice('Brain')}>
        두뇌 회전
      </Button>
    </div>
  );
};

export default Mode;

const ModeTitle = styled.h2`
  font-size: 8vw;
  padding: 1rem 0 1.5rem 0;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

const Description = styled.p`
  font-size: 3vw;
  line-height: 2rem;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Example = styled.p`
  font-size: 3vw;
  padding: 5px 0;
  text-align: center;
  color: darkblue;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;
