import { createSlice } from '@reduxjs/toolkit'

const initialState = { value:-1 }

export const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers: {
    choice: (state, actions) => {
        state.value = actions.payload
    },
  },
});

export const { choice } = versionSlice.actions;

export default versionSlice.reducer;
