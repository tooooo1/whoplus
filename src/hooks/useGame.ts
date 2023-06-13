import React, { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { getItem, setItem } from '../utils/storage';

interface GameState {
  difficulty: number;
  power: number;
  round: number;
  time: number;
  timeDown: number | string;
  timeActive: boolean;
  active: boolean;
  first: number;
  second: number;
  value: string;
  progress: number;
  barColor: 'success' | 'secondary';
  inputColor: string;
  inputBackGroundColor: string;
}

interface GameAction {
  type: string;
  payload?: any;
}

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const initialTime = getItem('tooooo1_mode', 'Dementia') ? 4 : 2;

// 초기 상태 정의
const initialState: GameState = {
  difficulty: 10,
  power: 0,
  round: 1,
  time: initialTime,
  timeDown: initialTime,

  timeActive: false,
  active: false,
  first: rand(1, 10),
  second: rand(1, 10),
  value: '',
  progress: 0,

  barColor: 'success',
  inputColor: '#000000',
  inputBackGroundColor: '#f4f4f4',
};

// 리듀서 정의
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_DIFFICULTY':
      return {
        ...state,
        difficulty: state.difficulty * 10,
        time: state.time + 2,
      };
    case 'UPDATE_VALUE':
      return {
        ...state,
        value: action.payload,
      };
    case 'CORRECT_ANSWER':
      return {
        ...state,
        timeDown: '🟢',
        power:
          state.power +
          Math.floor(state.first + state.second / state.difficulty),
        inputColor: '#1bb749',
        inputBackGroundColor: '#c0f2cd',
        active: true,
        progress: 0,
      };
    case 'WRONG_ANSWER':
      setItem('tooooo1_round', state.round);
      setItem('tooooo1_power', state.power);
      return {
        ...state,
        timeDown: '🔴',
        inputColor: '#ff2e35',
        inputBackGroundColor: '#ffd2d7',
        barColor: 'secondary',
      };
    case 'TIME_TICK':
      return {
        ...state,
        timeDown: (state.timeDown as number) - 1,
        progress: state.progress + 100 / state.time,
      };
    case 'NEW_ROUND':
      return {
        ...state,
        round: state.round + 1,
        first: rand(state.difficulty / 10, state.difficulty),
        second: rand(state.difficulty / 10, state.difficulty),
        value: '',
        inputColor: '#000000',
        inputBackGroundColor: '#f4f4f4',
        timeDown: state.time,
      };
    case 'SCORE_ACTIVE_FALSE':
      return {
        ...state,
        active: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const navigate = useNavigate();
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
  } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_VALUE', payload: e.target.value });

    if (parseInt(e.target.value) === first + second) {
      dispatch({ type: 'CORRECT_ANSWER' });
      setTimeout(() => {
        dispatch({ type: 'SCORE_ACTIVE_FALSE' });
      }, 100);

      if (round === 70) {
        setTimeout(() => {
          navigate('/end');
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch({ type: 'NEW_ROUND' });
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (round % 10 === 0) {
      dispatch({ type: 'UPDATE_DIFFICULTY' });
    }
  }, [round]);

  const tick = () => {
    if (typeof timeDown === 'string') return;
    if (timeDown > 0) dispatch({ type: 'TIME_TICK' });
    else if (timeDown === 0 || isNaN(timeDown)) {
      dispatch({ type: 'WRONG_ANSWER' });
      setTimeout(() => {
        navigate('/end');
      }, 1000);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

  return {
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
  };
};
