import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 2 }

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    incrementTime: (state) => {
      state.value += 2
    },
    timeReset: (state) => {
      state.value = 2
    }
  },
});

export const { incrementTime, timeReset } = timeSlice.actions;

export default timeSlice.reducer;
