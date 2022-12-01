import { configureStore } from '@reduxjs/toolkit';

import nicknameReducer from '../features/nicknameSlice.js';
import powerReducer from '../features/powerSlice.js';
import resultReducer from '../features/resultSlice.js';
import roundReducer from '../features/roundSlice.js';
import timeReducer from '../features/timeSlice.js';

export const store = configureStore({
  reducer: {
    round: roundReducer,
    time: timeReducer,
    nickname: nicknameReducer,
    power: powerReducer,
    result: resultReducer,
  },
});
