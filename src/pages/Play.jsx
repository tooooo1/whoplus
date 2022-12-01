import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { powerReset, powerUp } from '../features/powerSlice.js';
import {
  resultNick,
  resultPower,
  resultRound,
} from '../features/resultSlice.js';
import { increment } from '../features/roundSlice';
import { roundReset } from '../features/roundSlice.js';
import { incrementTime } from '../features/timeSlice';
import { timeReset } from '../features/timeSlice.js';

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let difficulty = 10;

const Play = () => {
  const round = useSelector((state) => state.round.value);
  const time = useSelector((state) => state.time.value);

  const power = useSelector((state) => state.power.value);
  const nickname = useSelector((state) => state.nickname.value);
  const dispatch = useDispatch();

  const [barcolor, setBarColor] = useState('success');
  const [timeActive, setTimeActive] = useState(false);
  const [active, setActive] = useState(false);
  const [timedown, setTimedown] = useState(time);
  const [first, setFirst] = useState(rand(difficulty / 10, difficulty));
  const [second, setSecond] = useState(rand(difficulty / 10, difficulty));
  const [value, setValue] = useState('');
  const [progress, setProgress] = useState(0);

  const [inputcolor, setInputColor] = useState('#000000');
  const [inputbackgroundcolor, setInputBackgroundColor] = useState('#f4f4f4');
  const [inputbordercolor, setInputBorderColor] = useState('#000000');
  const inputRef = useRef(null);

  const next = () => {
    setValue('');
    setInputColor('#000000');
    setInputBackgroundColor('#f4f4f4');
    setInputBorderColor('#000000');
    setFirst(rand(difficulty / 10, difficulty));
    setSecond(rand(difficulty / 10, difficulty));
    inputRef.current.focus();
    setTimedown(time);
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
        setTimedown(<img src="img/checked.png" alt="boxing" width={20} />);
        dispatch(powerUp(Math.floor(first + second / difficulty)));
        setInputColor('#1bb749');
        setInputBackgroundColor('#c0f2cd');
        setInputBorderColor('#1bb749');
        dispatch(resultNick(nickname));
        dispatch(resultPower(power));
        dispatch(resultRound(round));
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
        setTimedown(<img src="img/checked.png" alt="boxing" width={20} />);
        dispatch(powerUp(Math.floor(first + second / difficulty)));
        dispatch(increment());
        setInputColor('#1bb749');
        setInputBackgroundColor('#c0f2cd');
        setInputBorderColor('#1bb749');
        if (round % 10 === 0) difficulty *= 10;
        if (round % 10 === 9) dispatch(incrementTime());
        setTimeout(() => next(), 1000);
      }
    }
  };

  const navigate = useNavigate();

  const tick = () => {
    if (timedown === 0 || isNaN(timedown)) {
      setTimedown(<img src="img/remove.png" alt="boxing" width={20} />);
      setBarColor('secondary');
      setInputColor('#ff2e35');
      setInputBackgroundColor('#ffd2d7');
      setInputBorderColor('#ff2e35');

      dispatch(resultNick(nickname));
      dispatch(resultPower(power));
      dispatch(resultRound(round));

      setTimeout(() => {
        navigate('../end');
        dispatch(roundReset());
        dispatch(powerReset());
        dispatch(timeReset());
      }, 1000);
    } else {
      setTimedown(timedown - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    const buffertimer = setInterval(() => {
      setProgress((oldProgress) => {
        setTimeActive(true);
        setTimeout(() => {
          setTimeActive(false);
        }, 100);
        if (round % 10 !== 0) {
          var temp = 100 / time;
        } else {
          temp = 100 / (time - 2);
        }
        if (oldProgress >= 100) return 0;
        return oldProgress + temp;
      });
    }, 1000);
    return () => {
      clearInterval(buffertimer);
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
            <TimeUp active={timeActive}>{timedown}</TimeUp>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={barcolor}
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
            color={inputcolor}
            background={inputbackgroundcolor}
            border={inputbordercolor}
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
