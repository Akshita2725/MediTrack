import { configureStore } from '@reduxjs/toolkit';
import triageReducer from './triageSlice.js';

export const store = configureStore({
  reducer: {
    triage: triageReducer
  }
});

export default store;
