import styled from '@emotion/styled';
import LinearProgress from '@mui/material/LinearProgress';
import { useRef } from 'react';

import { useGame } from '../hooks/useGame';

const Play = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    power,
    round,
    barColor,
    active,
    first,
    second,
    timeActive,
    value,
    progress,
    timeDown,
    inputColor,
    inputBackGroundColor,
    handleChange,
  } = useGame();

  return (
    <div>
      <Wrapper>
        <Round>
          ROUND <Stage active={active}>{round}</Stage>
        </Round>
        <TimeUp active={timeActive}>{timeDown}</TimeUp>
        <LinearProgress
          aria-label="남은 시간"
          variant="determinate"
          value={progress}
          color={barColor}
          sx={{
            borderRadius: '10px',
            marginBottom: '1.2rem',
            height: '1.2vh',
            width: '100%',
          }}
        />
        <SubMissionQuestion>
          {first} + {second}
        </SubMissionQuestion>
        <SubMissionInput
          aria-label="정답 입력"
          ref={inputRef}
          value={value}
          onChange={handleChange}
          color={inputColor}
          background={inputBackGroundColor}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <Score active={active}>{power.toLocaleString()}</Score>
      </Wrapper>
    </div>
  );
};

export default Play;

interface ActiveProp {
  active: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Score = styled.div<ActiveProp>`
  font-size: 3vw;

  font-family: 'RixYeoljeongdo';
  @media (min-width: 768px) {
    font-size: 30px;
  }

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
  font-size: 6vw;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const SubMissionQuestion = styled.div`
  font-size: 7vw;
  font-family: 'Pretendard-Bold';

  background-color: #ffffff;
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
  font-size: 3vw;
  padding: 0.8rem;
  margin: 1rem 0;
  font-family: 'Pretendard-Bold';
  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 25px;
  }
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
