import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: '' }

export const roundSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
});

export const { increment } = roundSlice.actions;

export default roundSlice.reducer;
