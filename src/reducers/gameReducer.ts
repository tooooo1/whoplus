import {
  ACTION_TYPES,
  INDICATOR_COLORS,
  INITIAL_TIMES,
  INPUT_BACKGROUND_COLORS,
  INPUT_COLORS,
  STORAGE_KEY,
} from '../constants';
import { getItem, setItem } from '../utils';

export interface GameState {
  difficulty: number;
  power: number;
  round: number;
  time: number;
  timeDown: number;
  indicatorColor: string | null;
  timeActive: boolean;
  active: boolean;
  first: number;
  second: number;
  value: string;
  progress: number;
  barColor: 'primary' | 'secondary';
  inputColor: string;
  inputBackGroundColor: string;
}

export type GameMode = 'Dementia' | 'Brain';

export interface GameAction {
  type: keyof typeof ACTION_TYPES;
  payload?: string;
}

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const getInitialTime = () => {
  const mode = getItem(STORAGE_KEY.MODE, 'Brain');
  return mode !== 'Brain' ? INITIAL_TIMES.DEMENTIA : INITIAL_TIMES.BRAIN;
};

export const initialState: GameState = {
  difficulty: 10,
  power: 0,
  round: 1,
  time: getInitialTime(),
  timeDown: getInitialTime(),
  indicatorColor: null,
  timeActive: false,
  active: false,
  first: getRandomNumber(1, 10),
  second: getRandomNumber(1, 10),
  value: '',
  progress: 0,
  barColor: 'secondary',
  inputColor: INPUT_COLORS.DEFAULT,
  inputBackGroundColor: INPUT_BACKGROUND_COLORS.DEFAULT,
};

const updateDifficulty = (state: GameState): GameState => ({
  ...state,
  difficulty: state.difficulty * 10,
  time: state.time + 2,
});

const updateValue = (state: GameState, value: string): GameState => ({
  ...state,
  value,
});

const handleCorrectAnswer = (state: GameState): GameState => {
  const newPower =
    state.power + Math.floor(state.first + state.second / state.difficulty);
  setItem(STORAGE_KEY.ROUND, state.round);
  setItem(STORAGE_KEY.POWER, newPower);

  return {
    ...state,
    indicatorColor: INDICATOR_COLORS.GREEN,
    power: newPower,
    inputColor: INPUT_COLORS.CORRECT,
    inputBackGroundColor: INPUT_BACKGROUND_COLORS.CORRECT,
    active: true,
    progress: 0,
  };
};

const handleWrongAnswer = (state: GameState): GameState => {
  setItem(STORAGE_KEY.ROUND, state.round);
  setItem(STORAGE_KEY.POWER, state.power);

  return {
    ...state,
    indicatorColor: INDICATOR_COLORS.RED,
    inputColor: INPUT_COLORS.WRONG,
    inputBackGroundColor: INPUT_BACKGROUND_COLORS.WRONG,
    barColor: 'primary',
  };
};

const handleTimeTick = (state: GameState): GameState => ({
  ...state,
  timeDown: state.timeDown - 1,
  progress: state.progress + 100 / state.time,
});

const startNewRound = (state: GameState): GameState => ({
  ...state,
  round: state.round + 1,
  first: getRandomNumber(state.difficulty / 10, state.difficulty),
  second: getRandomNumber(state.difficulty / 10, state.difficulty),
  value: '',
  indicatorColor: null,
  inputColor: INPUT_COLORS.DEFAULT,
  inputBackGroundColor: INPUT_BACKGROUND_COLORS.DEFAULT,
  timeDown: state.time,
});

const deactivateScore = (state: GameState): GameState => ({
  ...state,
  active: false,
});

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DIFFICULTY:
      return updateDifficulty(state);
    case ACTION_TYPES.UPDATE_VALUE:
      if (!action.payload) {
        throw new Error('UPDATE_VALUE action requires a payload');
      }
      return updateValue(state, action.payload);
    case ACTION_TYPES.CORRECT_ANSWER:
      return handleCorrectAnswer(state);
    case ACTION_TYPES.WRONG_ANSWER:
      return handleWrongAnswer(state);
    case ACTION_TYPES.TIME_TICK:
      return handleTimeTick(state);
    case ACTION_TYPES.NEW_ROUND:
      return startNewRound(state);
    case ACTION_TYPES.SCORE_ACTIVE_FALSE:
      return deactivateScore(state);
    default:
      return state;
  }
};

export default gameReducer;
