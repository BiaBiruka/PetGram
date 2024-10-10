// My "reducer with all reducers"
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
