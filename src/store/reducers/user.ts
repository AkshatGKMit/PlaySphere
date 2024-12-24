import { createSlice } from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import {
  removeUserAction,
  setUserAction,
  setCollectionsAction,
  removeCollectionAction,
  addGameToCollectionAction,
  removeGameFromCollectionAction,
} from '@store/actions/userActions';

const { NAME: name } = STORE_CONSTANTS.USER;

const initialState: UserState = {
  user: null,
  collections: null,
};

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser: setUserAction,
    removeUser: removeUserAction,
    setCollections: setCollectionsAction,
    removeCollection: removeCollectionAction,
    addGameToCollection: addGameToCollectionAction,
    removeGameFromCollection: removeGameFromCollectionAction,
  },
});

const userReducer = userSlice.reducer;

export const {
  addGameToCollection,
  removeCollection,
  removeGameFromCollection,
  removeUser,
  setCollections,
  setUser,
} = userSlice.actions;

export default userReducer;
