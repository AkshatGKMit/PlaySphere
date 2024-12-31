import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from '@constants';
import {
  requestAddGameToCollection,
  requestAddNewCollection,
  requestDeleteCollection,
  requestRemoveGameFromCollection,
  requestUpdateCollection,
} from '@network/apiEndpointCalls';
import useQueryKeys from '@config/useQueryKeys';
import { useAppSelector } from '@store';

const {
  createNewCollection: createOrUpdateCollectionKey,
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
        queryClient.setQueryData<GameInCollectionsResponse>(key, (data) => {
          if (!data) {
            return undefined;
          }

          const duplicateData = data.filter(({ id }) => id !== collectionId);

          return duplicateData;
        });
      }
    },
    [getKeysContaining, queryClient],
  );

  const updateGameInCollectionQueryData = useCallback(
    ({ collectionId, gameId, isAdding }: AddOrRemoveFromCollectionVariables) => {
      queryClient.setQueryData<GameInCollectionsResponse>([userCollectionsKey, gameId], (data) => {
        if (!data) {
          return undefined;
        }

        const duplicateData = data.map((collection) => {
          const { id } = collection;
          if (id !== collectionId) {
            return collection;
          }

          return { ...collection, game_in_collection: isAdding };
        });

        return duplicateData;
      });
    },
    [queryClient],
  );

  const removeGameFromMyCollectionQueryData = useCallback(
    ({ collectionId }: AddOrRemoveFromCollectionVariables) => {
      const keys = getKeysContaining(myCollectionsKey);

      for (const key of keys) {
        queryClient.setQueryData<InfiniteData<PaginatedCollectionDetailsResponse>>(key, (data) => {
          if (!data) {
            return undefined;
          }

          const duplicateData = { ...data };
          duplicateData.pages = data.pages.map((page) => ({
            ...page,
            results: page.results.map((result) => {
              const { id, games_count, backgrounds } = result;

              if (id !== collectionId) {
                return result;
              }

              const newCount = games_count - 1;
              const newBackgrounds =
                backgrounds && newCount > 0 ? backgrounds?.filter((_, index) => index !== 0) : null;

              return {
                ...result,
                games_count: newCount,
                backgrounds: newBackgrounds,
              };
            }),
          }));

          return duplicateData;
        });
      }
    },
    [getKeysContaining, queryClient],
  );

  const updateGameInCollectionGamesQueryData = useCallback(
    ({ collectionId, gameId, isAdding, game }: AddOrRemoveFromCollectionVariables) => {
      queryClient.setQueryData<InfiniteData<PaginatedGames>>(
        [collectionGamesKey, collectionId],
        (data) => {
          if (!data) {
            return undefined;
          }

          const duplicateData = { ...data };

          duplicateData.pages = data.pages.map((page) => ({
            ...page,
            count: page.count - 1,
            results: isAdding
              ? [game, ...page.results]
              : page.results.filter(({ id }) => id !== gameId),
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
        queryClient.setQueryData<InfiniteData<PaginatedCollectionDetailsResponse>>(key, (data) => {
          if (!data) {
            return undefined;
          }

          const duplicateData = { ...data };

          duplicateData.pages = data.pages.map((page) => ({
            ...page,
            count: page.count - 1,
            results: page.results.filter(({ id }) => id !== collectionId),
          }));

          return duplicateData;
        });
      }
    },
    [getKeysContaining, queryClient],
  );

  const updateGameCountInCollectionQueryData = useCallback(
    ({ collectionId, isAdding, game }: AddOrRemoveFromCollectionVariables) => {
      queryClient.setQueryData<InfiniteData<PaginatedCollectionDetailsResponse>>(
        [myCollectionsKey, user?.id],
        (data) => {
          if (!data) {
            return data;
          }

          const duplicateData = { ...data };

          duplicateData.pages = data.pages.map((page) => ({
            ...page,
            results: page.results.map((result) => {
              const { id, games_count, backgrounds } = result;

              if (id !== collectionId) {
                return result;
              }

              return {
                ...result,
                games_count: isAdding ? games_count + 1 : games_count - 1,
                backgrounds: backgrounds
                  ? isAdding
                    ? [{ url: game.backgroundImage }, ...backgrounds]
                    : backgrounds.filter((_, index) => index !== 0)
                  : [],
              };
            }),
          }));

          return duplicateData;
        },
      );
    },
    [queryClient, user?.id],
  );
  //#endregion

  //#region - Update game in collection Mutation
  const onUpdateGameMutationSuccess = useCallback(
    (_: unknown, variables: AddOrRemoveFromCollectionVariables) => {
      updateGameInCollectionQueryData(variables);
      updateGameInCollectionGamesQueryData(variables);

      updateGameCountInCollectionQueryData(variables);

      setUpdateGameLoading(false);
    },
    [
      updateGameCountInCollectionQueryData,
      updateGameInCollectionGamesQueryData,
      updateGameInCollectionQueryData,
    ],
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
  const onAddOrUpdateCollectionSuccess = (
    responseData:
      | ApiSuccessResponse<CollectionDetailResponse>
      | ApiErrorResponse<AddNewCollectionResponseError>,
    { game, updateCollectionId }: AddNewOrUpdateCollectionBody,
  ) => {
    if (!responseData.success) {
      return;
    }

    const { result: collectionData } = responseData;
    const { id: collectionId, name, slug } = collectionData;

    if (game) {
      mutateGameToCollection({ collectionId, game, gameId: game.id, isAdding: true });
    }

    const userCollectionKeys = getKeysContaining(userCollectionsKey);
    const myCollectionsKeys = getKeysContaining(myCollectionsKey);

    for (const key of userCollectionKeys) {
      queryClient.setQueryData<GameInCollectionsResponse>(key, (data) => {
        if (!data) {
          return data;
        }

        let duplicateData = data;

        if (updateCollectionId) {
          duplicateData = duplicateData.map((collection) => {
            const { id } = collection;

            if (id !== updateCollectionId) {
              return collection;
            }

            return {
              ...collection,
              name: collectionData.name,
            };
          });
        } else {
          duplicateData = [
            { id: collectionId, name, slug, game_in_collection: !!game },
            ...duplicateData,
          ];
        }

        return duplicateData;
      });
    }

    for (const key of myCollectionsKeys) {
      queryClient.setQueryData<InfiniteData<PaginatedCollectionDetailsResponse>>(key, (data) => {
        if (!data) {
          return data;
        }

        const duplicateData = { ...data };

        if (updateCollectionId) {
          duplicateData.pages = data.pages.map((page) => ({
            ...page,
            results: page.results.map((collection) => {
              const { id } = collection;

              if (id !== updateCollectionId) {
                return collection;
              }

              return {
                ...collection,
                name: collectionData.name,
              };
            }),
          }));
        } else {
          duplicateData.pages = data.pages.map((page) => ({
            ...page,
            count: page.count + 1,
            results: [collectionData, ...page.results],
          }));
        }

        return duplicateData;
      });
    }
  };

  const addOrUpdateCollectionMutationFunction = useCallback(
    async (newCollection: AddNewOrUpdateCollectionBody) => {
      const { updateCollectionId } = newCollection;

      if (updateCollectionId) {
        return requestUpdateCollection(updateCollectionId, newCollection);
      }

      return requestAddNewCollection(newCollection);
    },
    [],
  );
  //#endregion

  //#region - Remove Game from collection Mutation
  const onRemoveGameFromCollectionSuccess = (
    _: any,
    variables: RemoveGameFromCollectionVariables,
  ) => {
    const params = { ...variables, isAdding: false };

    updateGameInCollectionGamesQueryData(params);

    updateGameInCollectionQueryData(params);

    removeGameFromMyCollectionQueryData(params);

    setRemoveGameFromCollectionLoading(false);
  };

  const removeGameFromCollectionMutationFunction = useCallback(
    async ({ collectionId, gameId }: RemoveGameFromCollectionVariables) => {
      return requestRemoveGameFromCollection(collectionId, { games: [gameId] });
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
    mutate: mutateAddOrUpdateCollection,
    isPending: addOrUpdateCollectionLoading,
    isSuccess: addOrUpdateCollectionSuccess,
    error: addOrUpdateCollectionErrorResponse,
  } = useMutation({
    mutationKey: [createOrUpdateCollectionKey],
    mutationFn: addOrUpdateCollectionMutationFunction,
    onSuccess: onAddOrUpdateCollectionSuccess,
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

  const addOrUpdateCollectionError = useMemo(() => {
    if (addOrUpdateCollectionErrorResponse) {
      const error = addOrUpdateCollectionErrorResponse as AxiosError<AddNewCollectionResponseError>;

      const { name } = error.response?.data ?? {};

      return name?.join(', ');
    }
  }, [addOrUpdateCollectionErrorResponse]);

  return {
    mutateAddOrUpdateCollection,
    addOrUpdateCollectionSuccess,
    addOrUpdateCollectionLoading,
    addOrUpdateCollectionError,
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
