import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 1 }

export const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    rountReset: (state) => {
      state.value = 1
    }
  },
});

export const { increment, rountReset } = roundSlice.actions;

export default roundSlice.reducer;
