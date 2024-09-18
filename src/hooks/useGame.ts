import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { MAX_ROUND, ROUTES } from '../constants';
import gameReducer, {
  initialState,
  getInitialTime,
} from '../reducers/gameReducer';

const initialTime = getInitialTime();

/**
 * useGame 훅은 게임의 로직과 사이드 이펙트를 관리합니다.
 * gameReducer를 통해 상태 관리를 수행하고, 타이머 및 네비게이션과 같은 사이드 이펙트를 처리합니다.
 */
const useGame = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    time: initialTime,
  });

  const progress = ((initialTime - state.time) / initialTime) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch({ type: 'UPDATE_VALUE', payload: inputValue });

    const inputNumber = Number(inputValue);
    if (!isNaN(inputNumber) && inputNumber === state.first + state.second) {
      dispatch({ type: 'CORRECT_ANSWER' });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, NEXT_TIMEOUT);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (state.time <= 0) {
      dispatch({ type: 'WRONG_ANSWER' });
    }
  }, [state.time]);

  useEffect(() => {
    if (state.status === 'correct') {
      const scoreTimeout = setTimeout(() => {
        dispatch({ type: 'SCORE_ACTIVE_FALSE' });
      }, SCORE_ACTIVE_FALSE_TIMEOUT);

      const nextRoundTimeout = setTimeout(() => {
        if (state.round >= MAX_ROUND) {
          navigate(ROUTES.END);
        } else {
          dispatch({ type: 'NEW_ROUND', payload: { initialTime } });
          inputRef.current?.focus();
        }
      }, NEXT_TIMEOUT);

      return () => {
        clearTimeout(scoreTimeout);
        clearTimeout(nextRoundTimeout);
      };
    } else if (state.status === 'wrong') {
      const endGameTimeout = setTimeout(() => {
        navigate(ROUTES.END);
      }, NEXT_TIMEOUT);

      return () => clearTimeout(endGameTimeout);
    }
  }, [state.status, state.round, navigate, initialTime]);

  return { state, handleChange, progress };
};

export default useGame;

const NEXT_TIMEOUT = 1_000;
const SCORE_ACTIVE_FALSE_TIMEOUT = 100;
