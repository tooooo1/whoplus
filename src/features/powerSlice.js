import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

export const powerSlice = createSlice({
  name: 'power',
  initialState,
  reducers: {
    powerUp: (state, action) => {
      state.value += action.payload
    },
    powerReset: (state) => {
      state.value = 0
    }
  },
});

export const { powerUp, powerReset } = powerSlice.actions;

export default powerSlice.reducer;
