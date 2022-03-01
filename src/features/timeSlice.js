import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 2, dementia: 4 }

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    incrementTime: (state) => {
      state.value += 2
    },
    incrementTimeDementia: (state) => {
      state.dementia += 4
    },
    timeReset: (state) => {
      state.value = 2
      state.dementia = 4
    },
  },
});

export const { incrementTime, timeReset, incrementTimeDementia } = timeSlice.actions;

export default timeSlice.reducer;
