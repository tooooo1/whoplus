import styled from '@emotion/styled';

import Button from '../components/Button.jsx';
import { getItem } from '../utils/storage.js';

const End = () => {
  const round = getItem('tooooo1_round', 1);
  const name = getItem('tooooo1_name', 1);
  const power = getItem('tooooo1_power', 1);

  // const comma = power.toLocaleString();

  const reset = () => {
    window.location.replace('/');
    setTimeout(() => {
      window.location.replace('/');
    }, 1000);
  };

  return (
    <div>
      <Wrapper>
        <Title>누가더쎔?</Title>
        <Round>
          ROUND <Color>{round}</Color> / 70
        </Round>
        <Text>닉네임 : {name}</Text>
        <ResultWrapper>
          <Power>
            <img
              src="img/boxing-gloves.png"
              alt="boxing"
              width={50}
              height={50}
            />
            <div>전투력</div>
            <div>{power}</div>
          </Power>
          <Button color="#ff2e35" onClick={() => reset()}>
            다시하기
          </Button>
        </ResultWrapper>
      </Wrapper>
    </div>
  );
};

export default End;

const Round = styled.div`
  padding: 1vh;
  font-size: 3vh;
  font-family: 'Pretendard-SemiBold';
  text-align: center;
`;

const Color = styled.span`
  color: #1bb749;
  text-align: center;
`;

const Title = styled.div`
  font-size: 9vw;
  padding: 1rem 0 1.2rem 0;
  text-align: center;
  font-family: 'RixYeoljeongdo_Regular';
  word-break: keep-all;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

const Text = styled.div`
  font-size: 5vw;
  padding-bottom: 2vh;
  text-align: center;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Power = styled.div`
  font-size: 5vw;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 2vh;
  text-align: center;
  font-family: 'Pretendard-SemiBold';
  padding: 12px;
  border-radius: 12px;
  background: #f1f1f1;

  @media only screen and (min-width: 768px) {
    font-size: 25px;
    width: 100%;
  }
`;

const Wrapper = styled.div`
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

const ResultWrapper = styled.div`
  padding: 1vh 14vw;
`;
