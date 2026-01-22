import {
  GAME_CONFIG,
  GAME_STATUS,
  type GameStatus,
  STORAGE_KEY,
} from '../constants';
import { calculateScore, generateNumbers, setItem } from '../utils';

export interface GameState {
  power: number;
  round: number;
  status: GameStatus;
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

const initialNumbers = generateNumbers(1);

export const initialState: GameState = {
  power: 0,
  round: 1,
  status: GAME_STATUS.DEFAULT,
  active: false,
  first: initialNumbers.first,
  second: initialNumbers.second,
  value: '',
  time: GAME_CONFIG.INITIAL_TIMES.DEMENTIA,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        value: action.payload,
      };
    case 'CORRECT_ANSWER': {
      const newPower = calculateScore(
        state.power,
        state.first,
        state.second,
        state.round,
      );

      setItem(STORAGE_KEY.ROUND, state.round);
      setItem(STORAGE_KEY.POWER, newPower);

      return {
        ...state,
        power: newPower,
        status: GAME_STATUS.CORRECT,
        active: true,
      };
    }
    case 'WRONG_ANSWER':
      setItem(STORAGE_KEY.ROUND, state.round);
      setItem(STORAGE_KEY.POWER, state.power);

      return {
        ...state,
        status: GAME_STATUS.WRONG,
      };
    case 'NEW_ROUND': {
      const nextRound = state.round + 1;
      const newNumbers = generateNumbers(nextRound);
      return {
        ...state,
        round: nextRound,
        first: newNumbers.first,
        second: newNumbers.second,
        value: '',
        status: GAME_STATUS.DEFAULT,
        time: action.payload.initialTime,
      };
    }
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
