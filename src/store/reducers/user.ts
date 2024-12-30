import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import {
  fetchCurrentUserAction,
  removeUserAction,
  setUserAction,
} from '@store/actions/userActions';
import { formatUserDetails } from '@network/dataFormatters';

const { NAME: name } = STORE_CONSTANTS.USER;

const initialState: UserState = {
  user: null,
};

const extraReducerBuilder = ({ addCase }: ActionReducerMapBuilder<UserState>) => {
  addCase(fetchCurrentUserAction.fulfilled, (state, { payload }) => {
    state.user = formatUserDetails(payload.data);
  });
};

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser: setUserAction,
    removeUser: removeUserAction,
  },
  extraReducers: extraReducerBuilder,
});

const userReducer = userSlice.reducer;

export const { removeUser, setUser } = userSlice.actions;

export default userReducer;
