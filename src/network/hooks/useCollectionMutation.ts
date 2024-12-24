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

  const [updateGameLoading, setUpdateGameLoading] = useState(false);
  const [removeCollectionLoading, setRemoveCollectionLoading] = useState(false);
  const [removeGameFromCollectionLoading, setRemoveGameFromCollectionLoading] = useState(false);

  const onUpdateGameMutationSuccess = useCallback(
    (_: unknown, variables: AddOrRemoveFromCollectionVariables) => {
      const { collectionId, gameId, isAdding } = variables;

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

      queryClient.invalidateQueries({ queryKey: [userCollectionsKey] });
      queryClient.invalidateQueries({ queryKey: [myCollectionsKey] });
      queryClient.invalidateQueries({ queryKey: [collectionGamesKey] });

      setUpdateGameLoading(false);
    },
    [queryClient],
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

  const onAddNewCollectionSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [userCollectionsKey] });
    queryClient.refetchQueries({ queryKey: [myCollectionsKey, user?.id] });
    queryClient.invalidateQueries({ queryKey: [createNewCollectionKey] });
  };

  const onRemoveCollectionSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [userCollectionsKey] });
    queryClient.refetchQueries({ queryKey: [myCollectionsKey, user?.id] });
    queryClient.invalidateQueries({ queryKey: [removeCollectionKey] });

    setRemoveCollectionLoading(false);
  };

  const onRemoveGameFromCollectionSuccess = (
    _: any,
    { collectionId, gameId }: RemoveGameFromCollectionVariables,
  ) => {
    queryClient.invalidateQueries({ queryKey: [collectionGamesKey, collectionId] });

    queryClient.invalidateQueries({ queryKey: [userCollectionsKey, gameId] });
  };

  const removeGameFromCollectionMutationFunction = useCallback(
    async ({ collectionId, feedId }: RemoveGameFromCollectionVariables) => {
      return requestRemoveGameFromCollectionFeed(collectionId, feedId);
    },
    [],
  );

  const addNewCollectionMutationFunction = useCallback(
    async (newCollectionName: AddNewOrUpdateCollectionBody) => {
      return requestAddNewCollection(newCollectionName);
    },
    [],
  );

  const removeCollectionMutationFunction = useCallback(async (collectionId: number) => {
    return requestDeleteCollection(collectionId);
  }, []);

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
    isPending: updateGameLoadingState,
    isSuccess: updateGameSuccess,
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
    if (updateGameLoadingState) {
      setUpdateGameLoading(updateGameLoadingState);
    }
  }, [updateGameLoadingState]);

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
    updateGameSuccess,
    updateGameLoading,
    mutateRemoveCollection,
    removeCollectionSuccess,
    removeCollectionLoading,
    removeGameFromCollectionLoading,
    mutateRemoveGameFromCollection,
  };
};

export default useCollectionMutation;
