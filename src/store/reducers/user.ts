import { createSlice } from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import { removeUserAction, setUserAction } from '@store/actions/userActions';

const { NAME: name } = STORE_CONSTANTS.USER;

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser: setUserAction,
    removeUser: removeUserAction,
  },
});

const userReducer = userSlice.reducer;

export const { removeUser, setUser } = userSlice.actions;

export default userReducer;
