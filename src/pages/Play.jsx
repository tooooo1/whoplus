import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { setItem } from '../utils/storage.js';

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const Play = () => {
  const [difficulty, setDifficulty] = useState(10);
  const [power, setPower] = useState(0);
  const [round, setRound] = useState(1);
  const [time, setTime] = useState(2);
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

    if (round === 70) {
      if (parseInt(e.target.value) === first + second) {
        setProgress(0);
        setActive(true);
        setTimeout(() => {
          setActive(false);
        }, 100);
        setTimeDown(
          <img src="img/checked.png" alt="boxing" width={20} height={20} />
        );
        setPower((prev) => prev + Math.floor(first + second / difficulty));
        setInputColor('#1bb749');
        setInputBackGroundColor('#c0f2cd');
        setTimeout(() => {
          navigate('../end');
        }, 1000);
      }
    } else {
      if (parseInt(e.target.value) === first + second) {
        setProgress(0);
        setActive(true);
        setTimeout(() => {
          setActive(false);
        }, 100);
        setTimeDown(
          <img src="img/checked.png" alt="boxing" width={20} height={20} />
        );
        setPower((prev) => prev + Math.floor(first + second / difficulty));
        setRound((prev) => prev + 1);
        setInputColor('#1bb749');
        setInputBackGroundColor('#c0f2cd');
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

  const navigate = useNavigate();

  const tick = () => {
    if (timeDown === 0 || isNaN(timeDown)) {
      setTime(<img src="img/remove.png" alt="boxing" width={20} height={20} />);
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
        <QuestionWrapper>
          <RoundWrapper>
            <Round>
              ROUND <Stage active={active}>{round}</Stage>
            </Round>
            <TimeUp active={timeActive}>{timeDown}</TimeUp>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={barColor}
              sx={{
                borderRadius: '10px',
                marginBottom: '1.2rem',
                height: '1.2vh',
              }}
            />
          </RoundWrapper>
          <SubMissionQuestion>
            {first} + {second}
          </SubMissionQuestion>
          <SubMissionInput
            ref={inputRef}
            value={value}
            onChange={handleChange}
            color={inputColor}
            background={inputBackGroundColor}
            border={inputColor}
            inputmode="numeric"
            pattern="[0-9]*"
          />
          <Score active={active}>{power.toLocaleString()}</Score>
        </QuestionWrapper>
      </Wrapper>
    </div>
  );
};

export default Play;

export const Title = styled.div`
  font-size: 10vh;
  font-weight: 1000;
  margin: 2rem 0;
  text-align: center;
  font-family: 'Pretendard-Black';
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

export const Text = styled.div`
  font-size: 2vw;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Pretendard-SemiBold';
  @media only screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

export const Score = styled.div`
  font-size: 3vw;
  text-align: center;
  font-family: 'RixYeoljeongdo_Regular';
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

export const Round = styled.div`
  font-weight: initial;
  font-size: 6vw;
  margin-bottom: 1rem;
  font-family: 'Pretendard-SemiBold';
  text-align: center;
  @media only screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

export const SubMissionQuestion = styled.div`
  font-size: 7vw;
  font-family: 'Pretendard-ExtraBold';
  text-align: center;
  background-color: #ffffff;
`;

export const SubMissionInput = styled.input`
  opacity: 0.6;
  border-radius: 30px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  text-align: center;
  font-size: 3vw;
  border: 2px solid ${(props) => props.bordercolor};
  padding: 0.8rem;
  margin: 1rem 0;
  width: 100%;
  font-family: 'Pretendard-ExtraBold';
  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 768px) {
    font-size: 25px;
  }
`;

export const QuestionWrapper = styled.div`
  padding: 8vh 15vw 5vh;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
`;

export const RoundWrapper = styled.div``;

export const Stage = styled.span`
  display: inline-block;
  animation: ${(props) => props.active && `bounce 0.3s infinite ease`};
  font-weight: bold;
  @keyframes bounce {
    0% {
      transform: scale(4);
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

export const TimeUp = styled.div`
  display: block;
  margin-bottom: 4px;
  text-align: center;
  background: #ffffff;
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

export const Wrapper = styled.div`
  padding: 10vw 0;

  @media (min-width: 768px) {
    padding: 5vw 0;
  }
`;
