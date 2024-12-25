import { INITIAL_TIMES, STORAGE_KEY } from '../constants';
import { setItem } from '../utils';

export interface GameState {
  power: number;
  round: number;
  status: 'default' | 'correct' | 'wrong';
  active: boolean;
  first: number;
  second: number;
  value: string;
  time: number;
}

type GameAction =
  | { type: 'UPDATE_VALUE'; payload: string }
  | { type: 'CORRECT_ANSWER' }
  | { type: 'WRONG_ANSWER' }
  | { type: 'NEW_ROUND'; payload: { initialTime: number } }
  | { type: 'SCORE_ACTIVE_FALSE' }
  | { type: 'TICK' };

/**
 * gameReducer는 게임 상태 전환을 관리하는 순수 함수입니다.
 * 현재 상태와 액션을 받아 새로운 상태를 반환합니다.
 */
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        value: action.payload,
      };
    case 'CORRECT_ANSWER':
      const difficulty = calculateDifficulty(state.round);
      const newPower =
        state.power + Math.floor(state.first + state.second / difficulty);

      setItem(STORAGE_KEY.ROUND, state.round);
      setItem(STORAGE_KEY.POWER, newPower);

      return {
        ...state,
        power: newPower,
        status: 'correct',
        active: true,
      };
    case 'WRONG_ANSWER':
      setItem(STORAGE_KEY.ROUND, state.round);
      setItem(STORAGE_KEY.POWER, state.power);

      return {
        ...state,
        status: 'wrong',
      };
    case 'NEW_ROUND':
      const nextRound = state.round + 1;
      const newNumbers = generateNewNumbers(nextRound);
      return {
        ...state,
        round: nextRound,
        first: newNumbers.first,
        second: newNumbers.second,
        value: '',
        status: 'default',
        time: action.payload.initialTime,
      };
    case 'SCORE_ACTIVE_FALSE':
      return {
        ...state,
        active: false,
      };
    case 'TICK':
      return {
        ...state,
        time: state.time - 1,
      };
    default:
      return state;
  }
};

export default gameReducer;

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const calculateDifficulty = (round: number) =>
  10 ** Math.floor((round - 1) / 10 + 1);

const generateNewNumbers = (round: number) => {
  const difficulty = calculateDifficulty(round);
  const min = difficulty / 10;
  const max = difficulty;
  return {
    first: getRandomNumber(min, max),
    second: getRandomNumber(min, max),
  };
};

const initialNumbers = generateNewNumbers(1);

export const initialState: GameState = {
  power: 0,
  round: 1,
  status: 'default',
  active: false,
  first: initialNumbers.first,
  second: initialNumbers.second,
  value: '',
  time: INITIAL_TIMES.DEMENTIA, // mode에 따라 override 해야하는 값
};
