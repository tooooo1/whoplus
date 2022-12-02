import styled from '@emotion/styled';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getItem, setItem } from '../utils/storage.js';

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const Play = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(10);
  const [power, setPower] = useState(0);
  const [round, setRound] = useState(1);
  const [time, setTime] = useState(getItem('tooooo_mode', 'Dementia') ? 4 : 2);
  const [timeDown, setTimeDown] = useState(time);
  const [barColor, setBarColor] = useState('success');
  const [timeActive, setTimeActive] = useState(false);
  const [active, setActive] = useState(false);
  const [first, setFirst] = useState(rand(difficulty / 10, difficulty));
  const [second, setSecond] = useState(rand(difficulty / 10, difficulty));
  const [value, setValue] = useState('');
  const [progress, setProgress] = useState(0);

  const [inputColor, setInputColor] = useState('#000000');
  const [inputBackGroundColor, setInputBackGroundColor] = useState('#f4f4f4');
  const inputRef = useRef(null);

  const next = () => {
    setValue('');
    setInputColor('#000000');
    setInputBackGroundColor('#f4f4f4');
    setFirst(rand(difficulty / 10, difficulty));
    setSecond(rand(difficulty / 10, difficulty));
    setRound((prev) => prev + 1);
    inputRef.current.focus();
    setTimeDown(time);
  };

  const handleChange = (e) => {
    setValue(e.target.value);

    if (parseInt(e.target.value) === first + second) {
      setProgress(0);
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 100);
      setTimeDown(
        <img src="images/checked.png" alt="boxing" width={20} height={20} />
      );
      setPower((prev) => prev + Math.floor(first + second / difficulty));
      setInputColor('#1bb749');
      setInputBackGroundColor('#c0f2cd');
      if (parseInt(e.target.value) === first + second) {
        setProgress(0);
        setActive(true);
        setTimeout(() => {
          setActive(false);
        }, 100);
        setTimeDown(
          <img src="images/checked.png" alt="boxing" width={20} height={20} />
        );
        setPower((prev) => prev + Math.floor(first + second / difficulty));
        setInputColor('#1bb749');
        setInputBackGroundColor('#c0f2cd');
      }

      if (round === 70) {
        setTimeout(() => {
          navigate('../end');
        }, 1000);
      } else {
        setRound((prev) => prev + 1);
        setTimeout(() => next(), 1000);
      }
    }
  };

  useEffect(() => {
    if (round % 9 === 0) {
      setDifficulty((prev) => prev * 10);
      setTime((prev) => prev + 2);
    }
  }, [round]);

  const tick = () => {
    if (timeDown === 0 || isNaN(timeDown)) {
      setTime(
        <img src="images/remove.png" alt="boxing" width={20} height={20} />
      );
      setBarColor('secondary');
      setInputColor('#ff2e35');
      setInputBackGroundColor('#ffd2d7');

      setItem('tooooo1_round', round);
      setItem('tooooo1_power', power);

      setTimeout(() => {
        navigate('/end');
      }, 1000);
    } else {
      setTimeDown(timeDown - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    const bufferTimer = setInterval(() => {
      setProgress((oldProgress) => {
        setTimeActive(true);
        setTimeout(() => {
          setTimeActive(false);
        }, 100);

        if (oldProgress >= 100) return 0;

        if (round % 10 !== 0) {
          return oldProgress + 100 / time;
        }
        return oldProgress + 100 / (time - 2);
      });
    }, 1000);
    return () => {
      clearInterval(bufferTimer);
    };
  });

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
          inputmode="numeric"
          pattern="[0-9]*"
        />
        <Score active={active}>{power.toLocaleString()}</Score>
      </Wrapper>
    </div>
  );
};

export default Play;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Score = styled.div`
  font-size: 3vw;

  font-family: 'RixYeoljeongdo';
  @media only screen and (min-width: 768px) {
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

  @media only screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

const SubMissionQuestion = styled.div`
  font-size: 7vw;
  font-family: 'Pretendard-Bold';

  background-color: #ffffff;
`;

const SubMissionInput = styled.input`
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

  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

const Stage = styled.span`
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

const TimeUp = styled.p`
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
