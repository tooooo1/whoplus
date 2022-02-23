import { configureStore } from '@reduxjs/toolkit';
import roundReducer from '../features/roundSlice'
import timeReducer from '../features/timeSlice'
import nicknameReducer from '../features/nicknameSlice';
import powerReducer from '../features/powerSlice';
import resultReducer from '../features/resultSlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    round: roundReducer,
    time: timeReducer,
    nickname: nicknameReducer,
    power: powerReducer,
    result: resultReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
