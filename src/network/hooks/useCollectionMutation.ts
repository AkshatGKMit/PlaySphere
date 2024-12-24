import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  //#region - Update Query Cached Data
  const updateCollectionInQueryData = useCallback(
    (collectionId: number) => {
      const keys = getKeysContaining(userCollectionsKey);

      for (const key of keys) {
        const response = queryClient.getQueryData<AxiosResponse<GameInCollectionsResponse>>(key);

        if (!response) {
          continue;
        }

        const newCollections = response.data.filter(({ id }) => id !== collectionId);

        const newResponse: AxiosResponse<GameInCollectionsResponse> = {
          ...response,
          data: newCollections,
        };

        queryClient.setQueryData<AxiosResponse<GameInCollectionsResponse>>(key, newResponse);
      }
    },
    [getKeysContaining, queryClient],
  );

  const updateGameInCollectionQueryData = useCallback(
    ({ collectionId, gameId, isAdding }: AddOrRemoveFromCollectionVariables) => {
      const response = queryClient.getQueryData<AxiosResponse<GameInCollectionsResponse>>([
        userCollectionsKey,
        gameId,
      ]);

      if (!response) {
        setUpdateGameLoading(false);
        return;
      }

      const newGameInCollections: GameInCollectionsResponse = response.data.map((collection) => {
        const { id } = collection;
        if (id !== collectionId) {
          return collection;
        }

        return { ...collection, game_in_collection: isAdding };
      });

      const newResponse: AxiosResponse<GameInCollectionsResponse> = {
        ...response,
        data: newGameInCollections,
      };

      queryClient.setQueryData<AxiosResponse<GameInCollectionsResponse>>(
        [userCollectionsKey, gameId],
        newResponse,
      );
    },
    [queryClient],
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
    queryClient.invalidateQueries({ queryKey: [collectionGamesKey, collectionId] });

    updateGameInCollectionQueryData({ collectionId, gameId, isAdding: false });
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
    updateCollectionInQueryData(collectionId);

    queryClient.refetchQueries({ queryKey: [myCollectionsKey, user?.id] });
    queryClient.invalidateQueries({ queryKey: [removeCollectionKey] });

    setRemoveCollectionLoading(false);
  };

  const removeCollectionMutationFunction = useCallback(async (collectionId: number) => {
    return Promise.resolve();
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
