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
  isScoreAnimating: boolean;
  first: number;
  second: number;
  value: string;
  time: number;
}

type GameAction =
  | { type: 'UPDATE_ANSWER'; payload: string }
  | { type: 'MARK_CORRECT' }
  | { type: 'MARK_WRONG' }
  | { type: 'START_NEW_ROUND'; payload: { initialTime: number } }
  | { type: 'HIDE_SCORE_ANIMATION' }
  | { type: 'DECREMENT_TIME' };

const initialNumbers = generateNumbers(1);

export const initialState: GameState = {
  power: 0,
  round: 1,
  status: GAME_STATUS.DEFAULT,
  isScoreAnimating: false,
  first: initialNumbers.first,
  second: initialNumbers.second,
  value: '',
  time: GAME_CONFIG.INITIAL_TIMES.DEMENTIA,
};

const saveProgress = (round: number, power: number): void => {
  setItem(STORAGE_KEY.ROUND, round);
  setItem(STORAGE_KEY.POWER, power);
};

const createNextRoundState = (
  state: GameState,
  initialTime: number,
): GameState => {
  const nextRound = state.round + 1;
  const { first, second } = generateNumbers(nextRound);

  return {
    ...state,
    round: nextRound,
    first,
    second,
    value: '',
    status: GAME_STATUS.DEFAULT,
    time: initialTime,
  };
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_ANSWER':
      return { ...state, value: action.payload };

    case 'MARK_CORRECT': {
      const newPower = calculateScore(
        state.power,
        state.first,
        state.second,
        state.round,
      );
      saveProgress(state.round, newPower);

      return {
        ...state,
        power: newPower,
        status: GAME_STATUS.CORRECT,
        isScoreAnimating: true,
      };
    }

    case 'MARK_WRONG':
      saveProgress(state.round, state.power);
      return { ...state, status: GAME_STATUS.WRONG };

    case 'START_NEW_ROUND':
      return createNextRoundState(state, action.payload.initialTime);

    case 'HIDE_SCORE_ANIMATION':
      return { ...state, isScoreAnimating: false };

    case 'DECREMENT_TIME':
      return { ...state, time: state.time - 1 };

    default:
      return state;
  }
};

export default gameReducer;
