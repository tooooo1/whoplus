import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACTION_TYPES, MAX_ROUND, ROUTES } from '../constants';
import { gameReducer, initialState } from '../reducers';
import { getInitialTime } from '../reducers/gameReducer';

const initialTime = getInitialTime();

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [time, setTime] = useState(initialTime);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const progress = ((initialTime - time) / initialTime) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTION_TYPES.UPDATE_VALUE, payload: e.target.value });

    if (parseInt(e.target.value, 10) === state.first + state.second) {
      dispatch({ type: ACTION_TYPES.CORRECT_ANSWER });
      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.SCORE_ACTIVE_FALSE });
      }, SCORE_ACTIVE_FALSE_TIMEOUT);

      if (state.round === MAX_ROUND) {
        setTimeout(() => {
          navigate(ROUTES.END);
        }, NEXT_TIMEOUT);
      } else {
        setTimeout(() => {
          dispatch({ type: ACTION_TYPES.NEW_ROUND });
          setTime(initialTime);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, NEXT_TIMEOUT);
      }
    }
  };

  const tick = () => {
    if (time > 0) {
      setTime(time - 1);
    } else {
      dispatch({ type: ACTION_TYPES.WRONG_ANSWER });
      setTimeout(() => {
        navigate(ROUTES.END);
      }, NEXT_TIMEOUT);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  return { state, handleChange, progress, time };
};

export default useGame;

const NEXT_TIMEOUT = 1_000;
const SCORE_ACTIVE_FALSE_TIMEOUT = 100;
