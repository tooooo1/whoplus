import { configureStore } from '@reduxjs/toolkit';
import roundReducer from '../features/roundSlice'
import timeReducer from '../features/timeSlice'

export const store = configureStore({
    reducer: {
        round: roundReducer,
        time: timeReducer,
    },
});
