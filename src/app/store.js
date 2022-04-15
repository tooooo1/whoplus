/*
[상태 관리]
해당 프로젝트에서 사용할 Reducer들을 저장합니다.(시간, 라운드, 닉네임, 전투력, 결과)
*/

import { configureStore } from "@reduxjs/toolkit";
import roundReducer from "../features/roundSlice";
import timeReducer from "../features/timeSlice";
import nicknameReducer from "../features/nicknameSlice";
import powerReducer from "../features/powerSlice";
import resultReducer from "../features/resultSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  round: roundReducer,
  time: timeReducer,
  nickname: nicknameReducer,
  power: powerReducer,
  result: resultReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
