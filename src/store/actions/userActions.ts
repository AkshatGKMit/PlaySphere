import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { StorageKey, STORE_CONSTANTS } from '@constants';
import { fetchCurrentUser } from '@network/apiEndpointCalls';
import instance from '@network/instance';

import { storage } from 'index';

const { THUNK } = STORE_CONSTANTS.USER;

export const setUserAction: CaseReducer<UserState, PayloadAction<User>> = (state, { payload }) => {
  state.user = payload;
};

export const removeUserAction: CaseReducer<UserState> = (state) => {
  storage.delete(StorageKey.token);
  instance.interceptors.request.clear();

  state.user = null;
};

export const fetchCurrentUserAction = createAsyncThunk(THUNK.FETCH_CURRENT_USER, async () => {
  const response = await fetchCurrentUser();

  return response;
});
