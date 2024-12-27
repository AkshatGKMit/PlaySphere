import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { StorageKey } from '@constants';
import instance from '@network/instance';

import { storage } from 'index';

export const fetchTokenFromStorage: CaseReducer<AuthState> = (state) => {
  const token = storage.getString(StorageKey.token);
  state.isAuthorized = !!token;

  if (token) {
    instance.interceptors.request.use((requestConfig) => {
      requestConfig.headers.set('token', token);
      return requestConfig;
    });
  }
};

export const login: CaseReducer<AuthState, PayloadAction<string>> = (state, action) => {
  const { payload } = action;

  storage.set(StorageKey.token, payload);

  state.isAuthorized = true;
};

export const logout: CaseReducer<AuthState> = (state) => {
  storage.delete(StorageKey.token);
  state.isAuthorized = false;
};
