import { configureStore } from '@reduxjs/toolkit';
import todoistReducer from './todoistSlice.js';

export const store = configureStore({
  reducer: {
    todoist: todoistReducer,
  },
});
