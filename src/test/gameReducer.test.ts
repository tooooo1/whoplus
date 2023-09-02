import {
  ACTION_TYPES,
  BAR_COLORS,
  INPUT_BACKGROUND_COLORS,
  INPUT_COLORS,
  TIME_DOWN_COLORS,
} from '../constants';
import {
  type GameAction,
  type GameState,
  gameReducer,
  initialState,
} from '../reducers';

describe('gameReducer', () => {
  it('초기 상태를 반환해야 합니다', () => {
    expect(gameReducer(initialState, {} as GameAction)).toEqual(initialState);
  });

  it('UPDATE_DIFFICULTY를 처리해야 합니다', () => {
    const action: GameAction = { type: ACTION_TYPES.UPDATE_DIFFICULTY };
    const expectedState: GameState = {
      ...initialState,
      difficulty: initialState.difficulty * 10,
      time: initialState.time + 2,
    };
    expect(gameReducer(initialState, action)).toEqual(expectedState);
  });

  it('UPDATE_VALUE를 처리해야 합니다', () => {
    const value = '10';
    const action: GameAction = {
      type: ACTION_TYPES.UPDATE_VALUE,
      payload: value,
    };
    const expectedState: GameState = { ...initialState, value };
    expect(gameReducer(initialState, action)).toEqual(expectedState);
  });

  it('CORRECT_ANSWER를 처리해야 합니다', () => {
    const action: GameAction = { type: ACTION_TYPES.CORRECT_ANSWER };
    const expectedState: GameState = {
      ...initialState,
      timeDown: TIME_DOWN_COLORS.GREEN,
      power:
        initialState.power +
        Math.floor(
          initialState.first + initialState.second / initialState.difficulty
        ),
      inputColor: INPUT_COLORS.CORRECT,
      inputBackGroundColor: INPUT_BACKGROUND_COLORS.CORRECT,
      active: true,
      progress: 0,
    };
    expect(gameReducer(initialState, action)).toEqual(expectedState);
  });

  it('WRONG_ANSWER를 처리해야 합니다', () => {
    const action: GameAction = { type: ACTION_TYPES.WRONG_ANSWER };
    const expectedState: GameState = {
      ...initialState,
      timeDown: TIME_DOWN_COLORS.RED,
      inputColor: INPUT_COLORS.WRONG,
      inputBackGroundColor: INPUT_BACKGROUND_COLORS.WRONG,
      barColor: BAR_COLORS.SECONDARY,
    };
    expect(gameReducer(initialState, action)).toEqual(expectedState);
  });

  it('TIME_TICK을 처리해야 합니다', () => {
    const action: GameAction = { type: ACTION_TYPES.TIME_TICK };
    const expectedState: GameState = {
      ...initialState,
      timeDown: (initialState.timeDown as number) - 1,
      progress: initialState.progress + 100 / initialState.time,
    };
    expect(gameReducer(initialState, action)).toEqual(expectedState);
  });
});
