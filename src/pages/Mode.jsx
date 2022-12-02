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
      <img src="img/options.png" alt="options" width={50} height={50} />
      <Title>게임 모드</Title>

      <Text>모드 선택에 따라 첫 시작 시간이 다릅니다.</Text>
      <Text>난이도는 동일합니다.</Text>
      <Ex id="last"> 치매 예방 : 5초 </Ex>
      <Ex id="last"> 두뇌 회전 : 3초 </Ex>
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
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'RixYeoljeongdo_Regular';
  word-break: keep-all;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

const Text = styled.div`
  font-size: 3vw;
  margin-bottom: 1.5vh;
  text-align: center;
  font-family: 'Pretendard-SemiBold';
  &#last {
    margin-bottom: 4vh;
  }
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const Ex = styled.div`
  font-size: 3vw;
  margin-bottom: 1.5vh;
  text-align: center;
  color: darkblue;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;
