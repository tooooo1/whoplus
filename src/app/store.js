import { configureStore } from '@reduxjs/toolkit';
import roundReducer from '../features/roundSlice'
import timeReducer from '../features/timeSlice'
import nicknameReducer from '../features/nicknameSlice';
import powerReducer from '../features/powerSlice';

export const store = configureStore({
    reducer: {
        round: roundReducer,
        time: timeReducer,
        nickname: nicknameReducer,
        power: powerReducer,
    },
});
