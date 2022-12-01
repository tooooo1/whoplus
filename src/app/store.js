import { configureStore } from '@reduxjs/toolkit';
import roundReducer from '../features/roundSlice.js';
import timeReducer from '../features/timeSlice.js';
import nicknameReducer from '../features/nicknameSlice.js';
import powerReducer from '../features/powerSlice.js';
import resultReducer from '../features/resultSlice.js';

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
