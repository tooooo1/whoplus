import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';

import { GAME_CONFIG, type GameMode, ROUTES } from '../constants';
import gameReducer, { initialState } from '../reducers/gameReducer';

const useGame = ({ mode = 'Dementia' }: { mode?: GameMode }) => {
  const navigate = useNavigate();
  const initialTime =
    mode === 'Dementia'
      ? GAME_CONFIG.INITIAL_TIMES.DEMENTIA
      : GAME_CONFIG.INITIAL_TIMES.BRAIN;

  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    time: initialTime,
  });

  const progress = ((initialTime - state.time) / initialTime) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch({ type: 'UPDATE_VALUE', payload: inputValue });

    const trimmed = inputValue.trim();
    if (trimmed !== '') {
      const num = Number(trimmed);
      if (!isNaN(num) && num === state.first + state.second) {
        dispatch({ type: 'CORRECT_ANSWER' });
      }
    }
  };

  useEffect(() => {
    if (state.status !== 'correct') {
      const timer = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, GAME_CONFIG.TIMEOUTS.NEXT_ROUND);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state.status]);

  useEffect(() => {
    if (state.time <= 0) {
      dispatch({ type: 'WRONG_ANSWER' });
    }
  }, [state.time]);

  useEffect(() => {
    if (state.status === 'correct') {
      const scoreTimeout = setTimeout(() => {
        dispatch({ type: 'SCORE_ACTIVE_FALSE' });
      }, GAME_CONFIG.TIMEOUTS.SCORE_ANIMATION);

      const nextRoundTimeout = setTimeout(() => {
        if (state.round >= GAME_CONFIG.MAX_ROUND) {
          navigate(ROUTES.END);
        } else {
          dispatch({ type: 'NEW_ROUND', payload: { initialTime } });
        }
      }, GAME_CONFIG.TIMEOUTS.NEXT_ROUND);

      return () => {
        clearTimeout(scoreTimeout);
        clearTimeout(nextRoundTimeout);
      };
    } else if (state.status === 'wrong') {
      const endGameTimeout = setTimeout(() => {
        navigate(ROUTES.END);
      }, GAME_CONFIG.TIMEOUTS.NEXT_ROUND);

      return () => {
        clearTimeout(endGameTimeout);
      };
    }
  }, [state.status, state.round, navigate, initialTime]);

  return { state, handleChange, progress };
};

export default useGame;
