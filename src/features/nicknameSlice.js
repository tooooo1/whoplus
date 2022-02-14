import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: '' }

export const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    inputData : (state, action) => {
      state.value = action.payload
    },
  },
});

export const { inputData } = nicknameSlice.actions;

export default nicknameSlice.reducer;
