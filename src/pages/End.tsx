import styled from '@emotion/styled';

import { Button } from '../components';
import { ROUTES, STORAGE_KEY } from '../constants';
import { getItem } from '../utils';

const End = () => {
  const round = getItem(STORAGE_KEY.ROUND, '1');
  const name = getItem(STORAGE_KEY.NAME, '1');
  const power = getItem(STORAGE_KEY.POWER, '1');

  const formattedPower = power.toLocaleString();

  const reset = () => {
    window.sessionStorage.clear();
    window.location.replace(ROUTES.HOME);
  };

  return (
    <section>
      <GameTitle>누가더쎔?</GameTitle>
      <GameRound>
        ROUND <RoundNumber>{round}</RoundNumber> / 70
      </GameRound>
      <PlayerName>닉네임 : {name}</PlayerName>
      <PowerDisplay>
        <picture>
          <source srcSet="images/boxing-gloves_resize.webp" type="image/webp" />
          <img
            src="images/boxing-gloves_resize.png"
            width={36}
            height={36}
            alt="Boxing Gloves"
            aria-hidden="true"
          />
        </picture>
        <div>전투력</div>
        <div>{formattedPower}</div>
      </PowerDisplay>
      <Button onClick={reset}>다시하기</Button>
    </section>
  );
};

export default End;

const GameTitle = styled.h1`
  font-size: 32px;
  padding: 16px 0 24px 0;
  font-family: 'RixYeoljeongdo';
  word-break: keep-all;
`;

const GameRound = styled.h2`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const RoundNumber = styled.span`
  color: #1bb749;
  text-align: center;
`;

const PlayerName = styled.p`
  font-size: 20px;
  padding-bottom: 16px;
  text-align: center;
`;

const PowerDisplay = styled.div`
  font-size: 20px;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 16px;
  text-align: center;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);
`;
