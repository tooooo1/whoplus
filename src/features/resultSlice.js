import { createSlice } from '@reduxjs/toolkit';

const initialState = { power: '', nick: '', round: '' };

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    resultPower: (state, action) => {
      state.power = action.payload;
    },
    resultNick: (state, action) => {
      state.nick = action.payload;
    },
    resultRound: (state, action) => {
      state.round = action.payload;
    },
  },
});

export const { resultPower, resultNick, resultRound } = resultSlice.actions;

export default resultSlice.reducer;
