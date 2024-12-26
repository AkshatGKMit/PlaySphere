import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import themeReducer from './theme';
import userReducer from './user';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
