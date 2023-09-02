import styled from '@emotion/styled';

import Button from '../components/Button';
import { ROUTES } from '../constants/routes';
import { STORAGE_KEY } from '../constants/storage';
import { getItem } from '../utils/storage';

const End = () => {
  const round = getItem(STORAGE_KEY.ROUND, '1');
  const name = getItem(STORAGE_KEY.NAME, '1');
  const power = getItem(STORAGE_KEY.POWER, '1');

  const formattedPower = power.toLocaleString();

  const reset = () => {
    window.sessionStorage.clear();
    window.location.replace(ROUTES.HOME);
    setTimeout(() => {
      window.location.replace(ROUTES.HOME);
    }, 1000);
  };

  return (
    <EndGameWrapper>
      <GameTitle>누가더쎔?</GameTitle>
      <GameRound>
        ROUND <RoundNumber>{round}</RoundNumber> / 70
      </GameRound>
      <PlayerName>닉네임 : {name}</PlayerName>
      <ResultContainer>
        <PowerDisplay>
          <img
            src="images/boxing-gloves.png"
            alt="boxing"
            width={50}
            height={50}
          />
          <div>전투력</div>
          <div>{formattedPower}</div>
        </PowerDisplay>
        <Button onClick={reset}>다시하기</Button>
      </ResultContainer>
    </EndGameWrapper>
  );
};

export default End;

const GameRound = styled.h2`
  padding: 1vh;
  font-size: 3vh;
  font-weight: bold;
  text-align: center;
`;

const RoundNumber = styled.span`
  color: #1bb749;
  text-align: center;
`;

const GameTitle = styled.h1`
  font-size: 9vw;
  padding: 1rem 0 1.2rem 0;
  text-align: center;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
  @media (min-width: 768px) {
    font-size: 60px;
  }
`;

const PlayerName = styled.p`
  font-size: 5vw;
  padding-bottom: 2vh;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const PowerDisplay = styled.div`
  font-size: 5vw;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 2vh;
  text-align: center;
  padding: 12px;
  border-radius: 12px;
  background: #f1f1f1;

  @media (min-width: 768px) {
    font-size: 25px;
    width: 100%;
  }
`;

const EndGameWrapper = styled.section`
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

const ResultContainer = styled.div`
  padding: 1vh 14vw;
`;
