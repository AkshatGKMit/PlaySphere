import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from '@constants';
import {
  requestAddGameToCollection,
  requestAddNewCollection,
  requestDeleteCollection,
  requestRemoveGameFromCollection,
  requestRemoveGameFromCollectionFeed,
} from '@network/apiEndpointCalls';
import { useAppSelector } from '@store';
import useQueryKeys from '@config/useQueryKeys';

const {
  createNewCollection: createNewCollectionKey,
  removeCollection: removeCollectionKey,
  updateGameInCollection: updateGameInCollectionKey,
  userCollections: userCollectionsKey,
  myCollections: myCollectionsKey,
  removeGameFromCollection: removeGameFromCollectionKey,
  collectionGames: collectionGamesKey,
} = QueryKeys;

const useCollectionMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);
  const { getKeysContaining } = useQueryKeys();

  const [updateGameLoading, setUpdateGameLoading] = useState(false);
  const [removeCollectionLoading, setRemoveCollectionLoading] = useState(false);
  const [removeGameFromCollectionLoading, setRemoveGameFromCollectionLoading] = useState(false);

  //#region - Update Game In Collection Query Cached Data
  const removeCollectionFromGameInCollectionQueryData = useCallback(
    (collectionId: number) => {
      const keys = getKeysContaining(userCollectionsKey);

      for (const key of keys) {
        queryClient.setQueryData<AxiosResponse<GameInCollectionsResponse>>(key, (data) => {
          if (!data) {
            return undefined;
          }

          const duplicateData = { ...data };

          duplicateData.data = duplicateData.data.filter(({ id }) => id !== collectionId);

          return duplicateData;
        });
      }
    },
    [getKeysContaining, queryClient],
  );

  const updateGameInCollectionQueryData = useCallback(
    ({ collectionId, gameId, isAdding }: AddOrRemoveFromCollectionVariables) => {
      queryClient.setQueryData<AxiosResponse<GameInCollectionsResponse>>(
        [userCollectionsKey, gameId],
        (data) => {
          if (!data) {
            return undefined;
          }

          const duplicateData = { ...data };

          duplicateData.data = duplicateData.data.map((collection) => {
            const { id } = collection;
            if (id !== collectionId) {
              return collection;
            }

            return { ...collection, game_in_collection: isAdding };
          });

          return duplicateData;
        },
      );
    },
    [queryClient],
  );

  const removeGameFromMyCollectionQueryData = useCallback(
    ({ collectionId }: AddOrRemoveFromCollectionVariables) => {
      const keys = getKeysContaining(myCollectionsKey);

      for (const key of keys) {
        queryClient.setQueryData<InfiniteData<AxiosResponse<PaginatedCollectionDetailsResponse>>>(
          key,
          (data) => {
            if (!data) {
              return undefined;
            }

            const duplicateData = { ...data };

            duplicateData.pages = duplicateData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                results: page.data.results.map((result) => {
                  const newCount = result.games_count - 1;

                  if (result.id !== collectionId) {
                    return result;
                  }

                  return {
                    ...result,
                    games_count: result.games_count - 1,
                    game_background: newCount > 0 ? result.game_background : null,
                  };
                }),
              },
            }));

            return duplicateData;
          },
        );
      }
    },
    [getKeysContaining, queryClient],
  );

  const updateGameInCollectionGamesQueryData = useCallback(
    ({ collectionId, gameId }: AddOrRemoveFromCollectionVariables) => {
      queryClient.setQueryData<InfiniteData<AxiosResponse<PaginatedCollectionFeedsResponse>>>(
        [collectionGamesKey, collectionId],
        (data) => {
          if (!data) {
            return undefined;
          }

          const duplicateData = { ...data };

          duplicateData.pages = data.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              count: page.data.count - 1,
              results: page.data.results.filter(({ game }) => game.id !== gameId),
            },
          }));

          return duplicateData;
        },
      );
    },
    [queryClient],
  );
  //#endregion

  //#region - Update Collection Query Cached Data
  const removeCollectionFromCollectionQueryData = useCallback(
    (collectionId: number) => {
      const keys = getKeysContaining(myCollectionsKey);

      for (const key of keys) {
        queryClient.setQueryData<InfiniteData<AxiosResponse<PaginatedCollectionDetailsResponse>>>(
          key,
          (data) => {
            if (!data) {
              return undefined;
            }

            const duplicateData = { ...data };

            duplicateData.pages = data.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                count: page.data.count - 1,
                results: page.data.results.filter(({ id }) => id !== collectionId),
              },
            }));

            return duplicateData;
          },
        );
      }
    },
    [getKeysContaining, queryClient],
  );
  //#endregion

  //#region - Update game in collection Mutation
  const onUpdateGameMutationSuccess = useCallback(
    (_: unknown, variables: AddOrRemoveFromCollectionVariables) => {
      updateGameInCollectionQueryData(variables);

      queryClient.invalidateQueries({ queryKey: [myCollectionsKey] });
      queryClient.invalidateQueries({ queryKey: [collectionGamesKey] });

      setUpdateGameLoading(false);
    },
    [queryClient, updateGameInCollectionQueryData],
  );

  const updateGameInCollectionMutationFunction = useCallback(
    ({ collectionId, gameId, isAdding }: AddOrRemoveFromCollectionVariables) => {
      if (isAdding) {
        return requestAddGameToCollection(collectionId, { games: [gameId] });
      }
      return requestRemoveGameFromCollection(collectionId, { games: [gameId] });
    },
    [],
  );
  //#endregion

  //#region - Add New Collection Mutation
  const onAddNewCollectionSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [userCollectionsKey] });
    queryClient.refetchQueries({ queryKey: [myCollectionsKey, user?.id] });
    queryClient.invalidateQueries({ queryKey: [createNewCollectionKey] });
  };

  const addNewCollectionMutationFunction = useCallback(
    async (newCollectionName: AddNewOrUpdateCollectionBody) => {
      return requestAddNewCollection(newCollectionName);
    },
    [],
  );
  //#endregion

  //#region - Remove Game from collection Mutation
  const onRemoveGameFromCollectionSuccess = (
    _: any,
    { collectionId, gameId }: RemoveGameFromCollectionVariables,
  ) => {
    updateGameInCollectionGamesQueryData({ collectionId, gameId, isAdding: false });

    updateGameInCollectionQueryData({ collectionId, gameId, isAdding: false });

    removeGameFromMyCollectionQueryData({ collectionId, gameId, isAdding: false });

    setRemoveGameFromCollectionLoading(false);
  };

  const removeGameFromCollectionMutationFunction = useCallback(
    async ({ collectionId, feedId }: RemoveGameFromCollectionVariables) => {
      return requestRemoveGameFromCollectionFeed(collectionId, feedId);
    },
    [],
  );
  //#endregion

  //#region - Remove Collection Mutation
  const onRemoveCollectionSuccess = (_: unknown, collectionId: number) => {
    removeCollectionFromGameInCollectionQueryData(collectionId);

    removeCollectionFromCollectionQueryData(collectionId);

    setRemoveCollectionLoading(false);
  };

  const removeCollectionMutationFunction = useCallback(async (collectionId: number) => {
    return requestDeleteCollection(collectionId);
  }, []);
  //#endregion

  const {
    mutate: mutateAddNewCollection,
    isPending: addNewCollectionLoading,
    isSuccess: addNewCollectionSuccess,
    error: addNewCollectionErrorResponse,
  } = useMutation({
    mutationKey: [createNewCollectionKey],
    mutationFn: addNewCollectionMutationFunction,
    onSuccess: onAddNewCollectionSuccess,
  });

  const {
    mutate: mutateRemoveCollection,
    isPending: removeCollectionLoadingState,
    isSuccess: removeCollectionSuccess,
  } = useMutation({
    mutationKey: [removeCollectionKey],
    mutationFn: removeCollectionMutationFunction,
    onSuccess: onRemoveCollectionSuccess,
  });

  const {
    mutate: mutateGameToCollection,
    isPending: updateGameToCollectionLoadingState,
    isSuccess: updateGameToCollectionSuccess,
  } = useMutation({
    mutationKey: [updateGameInCollectionKey],
    mutationFn: updateGameInCollectionMutationFunction,
    onSuccess: onUpdateGameMutationSuccess,
    onSettled: () => setUpdateGameLoading(false),
  });

  const {
    mutate: mutateRemoveGameFromCollection,
    isPending: removeGameFromCollectionLoadingState,
  } = useMutation({
    mutationKey: [removeGameFromCollectionKey],
    mutationFn: removeGameFromCollectionMutationFunction,
    onSuccess: onRemoveGameFromCollectionSuccess,
  });

  useEffect(() => {
    if (updateGameToCollectionLoadingState) {
      setUpdateGameLoading(updateGameToCollectionLoadingState);
    }
  }, [updateGameToCollectionLoadingState]);

  useEffect(() => {
    if (removeCollectionLoadingState) {
      setRemoveCollectionLoading(removeCollectionLoadingState);
    }
  }, [removeCollectionLoadingState]);

  useEffect(() => {
    if (removeGameFromCollectionLoadingState) {
      setRemoveGameFromCollectionLoading(removeGameFromCollectionLoadingState);
    }
  }, [removeGameFromCollectionLoadingState]);

  const addNewCollectionError = useMemo(() => {
    if (addNewCollectionErrorResponse) {
      const error = addNewCollectionErrorResponse as AxiosError<AddNewCollectionResponseError>;

      const { name } = error.response?.data ?? {};

      return name?.join(', ');
    }
  }, [addNewCollectionErrorResponse]);

  return {
    mutateAddNewCollection,
    addNewCollectionSuccess,
    addNewCollectionLoading,
    addNewCollectionError,
    mutateGameToCollection,
    updateGameToCollectionSuccess,
    updateGameLoading,
    mutateRemoveCollection,
    removeCollectionSuccess,
    removeCollectionLoading,
    removeGameFromCollectionLoading,
    mutateRemoveGameFromCollection,
  };
};

export default useCollectionMutation;
