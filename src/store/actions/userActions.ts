import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { StorageKey } from '@constants';
import instance from '@network/instance';

import { storage } from 'index';

export const setUserAction: CaseReducer<UserState, PayloadAction<User>> = (state, { payload }) => {
  state.user = payload;
};

export const removeUserAction: CaseReducer<UserState> = (state) => {
  storage.delete(StorageKey.token);
  instance.interceptors.request.use((requestConfig) => {
    requestConfig.headers.delete('token');
    return requestConfig;
  });

  state.user = null;
};
