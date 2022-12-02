import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button.jsx';
import { setItem } from '../utils/storage.js';

const Mode = () => {
  const navigate = useNavigate();

  const modeChoice = (mode) => {
    setItem('tooooo1_mode', mode);
    navigate('/play');
  };

  return (
    <div>
      <img src="images/options.png" alt="options" width={50} height={50} />
      <Title>게임 모드</Title>

      <Text>모드 선택에 따라 첫 시작 시간이 다릅니다.</Text>
      <Text>난이도는 동일합니다.</Text>
      <Ex>치매 예방 : 5초</Ex>
      <Ex>두뇌 회전 : 3초</Ex>
      <Button color="#ff2e35" id="list" onClick={() => modeChoice('Dementia')}>
        치매 예방
      </Button>
      <Button color="#01a8ff" id="list" onClick={() => modeChoice('Brain')}>
        두뇌 회전
      </Button>
    </div>
  );
};

export default Mode;

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
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Ex = styled.div`
  font-size: 3vw;
  padding: 5px 0;
  text-align: center;
  color: darkblue;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;
