import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';

import { GAME_CONFIG, GAME_STATUS, type GameMode, ROUTES } from '../constants';
import gameReducer, { initialState } from '../reducers/gameReducer';

const getInitialTimeForMode = (mode: GameMode): number =>
  mode === 'Dementia'
    ? GAME_CONFIG.INITIAL_TIMES.DEMENTIA
    : GAME_CONFIG.INITIAL_TIMES.BRAIN;

const isCorrectAnswer = (input: string, first: number, second: number): boolean => {
  const trimmed = input.trim();
  if (trimmed === '') return false;

  const answer = Number(trimmed);
  return !isNaN(answer) && answer === first + second;
};

const calculateTimeProgress = (elapsed: number, total: number): number =>
  ((total - elapsed) / total) * 100;

const useGame = ({ mode = 'Dementia' }: { mode?: GameMode }) => {
  const navigate = useNavigate();
  const initialTime = getInitialTimeForMode(mode);

  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    time: initialTime,
  });

  const timeProgress = calculateTimeProgress(state.time, initialTime);

  const handleAnswerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch({ type: 'UPDATE_ANSWER', payload: inputValue });

    if (isCorrectAnswer(inputValue, state.first, state.second)) {
      dispatch({ type: 'MARK_CORRECT' });
    }
  };

  useEffect(() => {
    const isPlaying = state.status !== GAME_STATUS.CORRECT;
    if (!isPlaying) return;

    const timer = setInterval(() => {
      dispatch({ type: 'DECREMENT_TIME' });
    }, GAME_CONFIG.TIMEOUTS.NEXT_ROUND);

    return () => {
      clearInterval(timer);
    };
  }, [state.status]);

  useEffect(() => {
    const hasTimeExpired = state.time <= 0;
    if (hasTimeExpired) {
      dispatch({ type: 'MARK_WRONG' });
    }
  }, [state.time]);

  useEffect(() => {
    const isGameOver = state.round >= GAME_CONFIG.MAX_ROUND;

    if (state.status === GAME_STATUS.CORRECT) {
      const hideAnimationTimer = setTimeout(() => {
        dispatch({ type: 'HIDE_SCORE_ANIMATION' });
      }, GAME_CONFIG.TIMEOUTS.SCORE_ANIMATION);

      const nextRoundTimer = setTimeout(() => {
        if (isGameOver) {
          navigate(ROUTES.END);
        } else {
          dispatch({ type: 'START_NEW_ROUND', payload: { initialTime } });
        }
      }, GAME_CONFIG.TIMEOUTS.NEXT_ROUND);

      return () => {
        clearTimeout(hideAnimationTimer);
        clearTimeout(nextRoundTimer);
      };
    }

    if (state.status === GAME_STATUS.WRONG) {
      const endGameTimer = setTimeout(() => {
        navigate(ROUTES.END);
      }, GAME_CONFIG.TIMEOUTS.NEXT_ROUND);

      return () => {
        clearTimeout(endGameTimer);
      };
    }
  }, [state.status, state.round, navigate, initialTime]);

  return { state, handleAnswerInput, timeProgress };
};

export default useGame;
