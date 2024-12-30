import { createSlice } from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import {
  fetchTokenFromStorage as fetchTokenFromStorageAction,
  login as loginAction,
  logout as logoutAction,
} from '@store/actions/authActions';

const { NAME: name } = STORE_CONSTANTS.AUTH;

const initialState: AuthState = {
  isAuthorized: null,
  isLogin: false,
};

const authSlice = createSlice({
  initialState,
  name,
  reducers: {
    fetchTokenFromStorage: fetchTokenFromStorageAction,
    login: loginAction,
    logout: logoutAction,
  },
});

const authReducer = authSlice.reducer;

export const { fetchTokenFromStorage, login, logout } = authSlice.actions;

export default authReducer;
