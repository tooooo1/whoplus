import styled from '@emotion/styled';
import LinearProgress from '@mui/material/LinearProgress';
import { useRef } from 'react';

import { useGame } from '../hooks';

const Play = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, handleChange } = useGame();

  return (
    <section>
      <Round>
        ROUND <Stage active={state.active}>{state.round}</Stage>
      </Round>
      <TimeUp active={state.timeActive}>{state.timeDown}</TimeUp>
      <LinearProgress
        aria-label="remaining time"
        variant="determinate"
        value={state.progress}
        color={state.barColor}
        sx={{
          borderRadius: '10px',
          marginBottom: '1.2rem',
          height: '1.2vh',
          width: '100%',
        }}
      />
      <SubMissionQuestion>
        {state.first} + {state.second}
      </SubMissionQuestion>
      <SubMissionInput
        autoFocus
        aria-label="answer input"
        ref={inputRef}
        value={state.value}
        onChange={handleChange}
        color={state.inputColor}
        background={state.inputBackGroundColor}
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <Score active={state.active}>{state.power.toLocaleString()}</Score>
    </section>
  );
};

export default Play;

interface ActiveProp {
  active: boolean;
}

const Score = styled.div<ActiveProp>`
  font-size: 12px;
  font-family: 'RixYeoljeongdo';

  animation: ${(props) => props.active && `shake 0.3s infinite`};
  @keyframes shake {
    0% {
      transform: translate(0px, 120px) rotate(0deg) scale(6);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg) scale(5);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg) scale(3);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg) scale(1.4);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

const Round = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
`;

const SubMissionQuestion = styled.div`
  font-size: 48px;
  font-family: 'Pretendard-Bold';
`;

const SubMissionInput = styled.input<{
  color: string;
  background: string;
}>`
  border-radius: 30px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  text-align: center;
  font-size: 24px;
  padding: 10px;
  margin: 16px 0;
  font-family: 'Pretendard-Bold';
`;

const Stage = styled.span<ActiveProp>`
  animation: ${(props) => props.active && `bounce 0.3s infinite ease`};
  font-weight: bold;
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.4);
    }
    60% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const TimeUp = styled.p<ActiveProp>`
  padding-bottom: 4px;
  height: 25px;
  animation: ${(props) => props.active && `bounce 0.3s infinite ease`};
  font-weight: bold;
  @keyframes bounce {
    0% {
      transform: scale(1.6);
    }
    40% {
      transform: scale(0.4);
    }
    60% {
      transform: scale(1.3);
    }
    80% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;
