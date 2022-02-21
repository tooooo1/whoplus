import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

export const powerSlice = createSlice({
  name: 'power',
  initialState,
  reducers: {
    powerup: (state, action) => {
      state.value += action.payload
    },
  },
});

export const { powerup } = powerSlice.actions;

export default powerSlice.reducer;