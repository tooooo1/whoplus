import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 2, plus: 0 };

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    incrementTime: (state) => {
      state.value += state.plus;
    },
    timeReset: (state) => {
      state.value = 2;
    },
    setValue: (state, actions) => {
      state.value = actions.payload;
    },
    setPlus: (state, actions) => {
      state.plus = actions.payload;
    },
  },
});

export const { incrementTime, timeReset, setValue, setPlus } =
  timeSlice.actions;

export default timeSlice.reducer;
