import type React from 'react';
import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ACTION_TYPES,
  BAR_COLORS,
  INPUT_BACKGROUND_COLORS,
  INPUT_COLORS,
  ROUTES,
  STORAGE_KEY,
  TIME_DOWN_COLORS,
} from '../constants';
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

type GameActionTypes = typeof ACTION_TYPES;
type GameActionKeys = keyof GameActionTypes;

interface GameAction {
  type: GameActionKeys;
  payload?: string;
}

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const initialTime = getItem(STORAGE_KEY.MODE, 'Dementia') ? 4 : 2;

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

  barColor: BAR_COLORS.SUCCESS,
  inputColor: INPUT_COLORS.DEFAULT,
  inputBackGroundColor: INPUT_BACKGROUND_COLORS.DEFAULT,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DIFFICULTY:
      return {
        ...state,
        difficulty: state.difficulty * 10,
        time: state.time + 2,
      };
    case ACTION_TYPES.UPDATE_VALUE:
      return {
        ...state,
        value: action.payload!,
      };
    case ACTION_TYPES.CORRECT_ANSWER:
      return {
        ...state,
        timeDown: TIME_DOWN_COLORS.GREEN,
        power:
          state.power +
          Math.floor(state.first + state.second / state.difficulty),
        inputColor: INPUT_COLORS.CORRECT,
        inputBackGroundColor: INPUT_BACKGROUND_COLORS.CORRECT,
        active: true,
        progress: 0,
      };
    case ACTION_TYPES.WRONG_ANSWER:
      setItem(STORAGE_KEY.ROUND, state.round);
      setItem(STORAGE_KEY.POWER, state.power);
      return {
        ...state,
        timeDown: TIME_DOWN_COLORS.RED,
        inputColor: INPUT_COLORS.WRONG,
        inputBackGroundColor: INPUT_BACKGROUND_COLORS.WRONG,
        barColor: BAR_COLORS.SECONDARY,
      };
    case ACTION_TYPES.TIME_TICK:
      return {
        ...state,
        timeDown: (state.timeDown as number) - 1,
        progress: state.progress + 100 / state.time,
      };
    case ACTION_TYPES.NEW_ROUND:
      return {
        ...state,
        round: state.round + 1,
        first: rand(state.difficulty / 10, state.difficulty),
        second: rand(state.difficulty / 10, state.difficulty),
        value: '',
        inputColor: INPUT_COLORS.DEFAULT,
        inputBackGroundColor: INPUT_BACKGROUND_COLORS.DEFAULT,
        timeDown: state.time,
      };
    case ACTION_TYPES.SCORE_ACTIVE_FALSE:
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
    dispatch({ type: ACTION_TYPES.UPDATE_VALUE, payload: e.target.value });

    if (parseInt(e.target.value, 10) === first + second) {
      dispatch({ type: ACTION_TYPES.CORRECT_ANSWER });
      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.SCORE_ACTIVE_FALSE });
      }, 100);

      if (round === 70) {
        setTimeout(() => {
          navigate(ROUTES.END);
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch({ type: ACTION_TYPES.NEW_ROUND });
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (round % 10 === 0) {
      dispatch({ type: ACTION_TYPES.UPDATE_DIFFICULTY });
    }
  }, [round]);

  const tick = () => {
    if (typeof timeDown === 'string') return;
    if (timeDown > 0) dispatch({ type: ACTION_TYPES.TIME_TICK });
    else if (timeDown === 0 || Number.isNaN(timeDown)) {
      dispatch({ type: ACTION_TYPES.WRONG_ANSWER });
      setTimeout(() => {
        navigate(ROUTES.END);
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
