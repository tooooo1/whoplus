import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 3 }

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    incrementTime: (state) => {
      state.value += 3
    },
  },
});

export const { incrementTime } = timeSlice.actions;

export default timeSlice.reducer;
