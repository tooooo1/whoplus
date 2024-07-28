import type React from 'react';
import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACTION_TYPES, MAX_ROUND, ROUTES } from '../constants';
import { gameReducer, initialState } from '../reducers';

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, NEXT_TIMEOUT);
      }
    }
  };

  useEffect(() => {
    if (state.round % 10 === 0) {
      dispatch({ type: ACTION_TYPES.UPDATE_DIFFICULTY });
    }
  }, [state.round]);

  const tick = () => {
    if (typeof state.timeDown === 'string') return;
    if (state.timeDown > 0) dispatch({ type: ACTION_TYPES.TIME_TICK });
    else if (state.timeDown === 0 || Number.isNaN(state.timeDown)) {
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

  return { state, handleChange };
};

export default useGame;

const NEXT_TIMEOUT = 1_000;
const SCORE_ACTIVE_FALSE_TIMEOUT = 100;
