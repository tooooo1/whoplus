import {
  ACTION_TYPES,
  BAR_COLORS,
  INITIAL_TIMES,
  INPUT_BACKGROUND_COLORS,
  INPUT_COLORS,
  STORAGE_KEY,
  TIME_DOWN_COLORS,
} from '../constants';
import { getItem, setItem } from '../utils';

export interface GameState {
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
  barColor: 'success' | 'failure';
  inputColor: string;
  inputBackGroundColor: string;
}

type GameActionTypes = typeof ACTION_TYPES;
type GameActionKeys = keyof GameActionTypes;

export type GameMode = 'Dementia' | 'Brain';
export interface GameAction {
  type: GameActionKeys;
  payload?: string;
}

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const initialTime =
  getItem(STORAGE_KEY.MODE, 'Brain') !== 'Brain'
    ? INITIAL_TIMES.DEMENTIA
    : INITIAL_TIMES.BRAIN;

export const initialState: GameState = {
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
        barColor: BAR_COLORS.FAILURE,
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
      return state;
  }
};

export default gameReducer;
