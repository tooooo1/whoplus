import { ACTION_TYPES, INITIAL_TIMES, STORAGE_KEY } from '../constants';
import { getItem, setItem } from '../utils';

export interface GameState {
  power: number;
  round: number;
  status: 'default' | 'correct' | 'wrong';
  active: boolean;
  first: number;
  second: number;
  value: string;
}

export interface GameAction {
  type: keyof typeof ACTION_TYPES;
  payload?: string;
}

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getInitialTime = () => {
  const mode = getItem(STORAGE_KEY.MODE, 'Brain');
  return mode !== 'Brain' ? INITIAL_TIMES.DEMENTIA : INITIAL_TIMES.BRAIN;
};

const calculateDifficulty = (round: number) => 10 ** Math.floor(round / 10 + 1);

export const initialState: GameState = {
  power: 0,
  round: 1,
  status: 'default',
  active: false,
  first: getRandomNumber(1, 10),
  second: getRandomNumber(1, 10),
  value: '',
};

const updateValue = (state: GameState, value: string): GameState => ({
  ...state,
  value,
});

const handleCorrectAnswer = (state: GameState): GameState => {
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
};

const handleWrongAnswer = (state: GameState): GameState => {
  setItem(STORAGE_KEY.ROUND, state.round);
  setItem(STORAGE_KEY.POWER, state.power);

  return {
    ...state,
    status: 'wrong',
  };
};

const startNewRound = (state: GameState): GameState => ({
  ...state,
  round: state.round + 1,
  first: getRandomNumber(
    calculateDifficulty(state.round) / 10,
    calculateDifficulty(state.round)
  ),
  second: getRandomNumber(
    calculateDifficulty(state.round) / 10,
    calculateDifficulty(state.round)
  ),
  value: '',
  status: 'default',
});

const deactivateScore = (state: GameState): GameState => ({
  ...state,
  active: false,
});

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_VALUE:
      if (action.payload === undefined) {
        throw new Error('UPDATE_VALUE action requires a payload');
      }
      return updateValue(state, action.payload);
    case ACTION_TYPES.CORRECT_ANSWER:
      return handleCorrectAnswer(state);
    case ACTION_TYPES.WRONG_ANSWER:
      return handleWrongAnswer(state);
    case ACTION_TYPES.NEW_ROUND:
      return startNewRound(state);
    case ACTION_TYPES.SCORE_ACTIVE_FALSE:
      return deactivateScore(state);
    default:
      return state;
  }
};

export default gameReducer;
