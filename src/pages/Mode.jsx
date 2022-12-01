import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button.jsx';
import { powerReset } from '../features/powerSlice.js';
import { roundReset } from '../features/roundSlice.js';
import { setPlus, setValue, timeReset } from '../features/timeSlice.js';

const Mode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reset = () => {
    dispatch(roundReset());
    dispatch(powerReset());
    dispatch(timeReset());
  };

  const DementiaVersion = () => {
    reset();

    dispatch(setValue(4));
    dispatch(setPlus(4));

    navigate('/play');
  };

  const BrainVersion = () => {
    reset();

    dispatch(setValue(2));
    dispatch(setPlus(2));

    navigate('/play');
  };

  return (
    <div>
      <Wrapper>
        <img src="img/options.png" alt="options" width={50} height={50} />
        <Title>게임 모드</Title>

        <Text>모드 선택에 따라 제한시간이 다릅니다.</Text>
        <Text>난이도는 동일합니다.</Text>
        <Ex id="last"> 치매 예방 : 5초 </Ex>
        <Ex id="last"> 두뇌 회전 : 3초 </Ex>
        <InputWrapper>
          <Button color="#ff2e35" id="list" onClick={DementiaVersion}>
            치매 예방
          </Button>
          <Button color="#01a8ff" id="list" onClick={BrainVersion}>
            두뇌 회전
          </Button>
        </InputWrapper>
      </Wrapper>
    </div>
  );
};

export default Mode;

export const Title = styled.div`
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

export const Text = styled.div`
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

export const Ex = styled.div`
  font-size: 3vw;
  margin-bottom: 1.5vh;
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
  line-height: 2rem;
  font-size: 1rem;
  padding: 10px 40px 10px 14px;
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
