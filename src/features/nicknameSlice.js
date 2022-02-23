import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: '' }

export const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    inputData : (state, action) => {
      state.value = action.payload
    },
    nicknameReset: (state) => {
      state.value = ''
    }
  },
});

export const { inputData, nicknameReset } = nicknameSlice.actions;

export default nicknameSlice.reducer;
