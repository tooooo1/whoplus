import { createSlice } from '@reduxjs/toolkit'

const initialState = { brain: false, dementia: false }

export const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers: {
    brainChoice: (state) => {
        state.brain = !state.brain
    },
    dementiaChoice: (state) => {
        state.dementia = !state.dementia
    },
  },
});

export const { brainChoice, dementiaChoice } = versionSlice.actions;

export default versionSlice.reducer;
