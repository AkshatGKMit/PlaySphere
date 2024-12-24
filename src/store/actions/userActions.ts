import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export const setUserAction: CaseReducer<UserState, PayloadAction<User>> = (state, { payload }) => {
  state.user = payload;
};

export const removeUserAction: CaseReducer<UserState> = (state) => {
  state.user = null;
};

export const setCollectionsAction: CaseReducer<UserState, PayloadAction<UserCollections>> = (
  state,
  { payload },
) => {
  state.collections = payload;
};

export const removeCollectionAction: CaseReducer<UserState, PayloadAction<number>> = (
  state,
  { payload },
) => {
  state.collections = state.collections!.filter(({ id }) => id !== payload);
};

export const addGameToCollectionAction: CaseReducer<
  UserState,
  PayloadAction<{ collectionId: number; gameId: number }>
> = (state, { payload }) => {
  const { collectionId, gameId } = payload;

  state.collections = state.collections!.map((collection) => {
    const { id, gameIds } = collection;
    if (id !== collectionId) {
      return collection;
    }

    return { ...collection, gameIds: [...gameIds, gameId] };
  });
};

export const removeGameFromCollectionAction: CaseReducer<
  UserState,
  PayloadAction<{ collectionId: number; gameId: number }>
> = (state, { payload }) => {
  const { collectionId, gameId } = payload;

  state.collections = state.collections!.map((collection) => {
    const { id, gameIds } = collection;
    if (id !== collectionId) {
      return collection;
    }

    return {
      ...collection,
      gameIds: gameIds.filter((savedGameId) => savedGameId !== gameId),
    };
  });
};
