import { useMemo } from 'react';
import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@constants';
import { fetchGameInCollection } from '@network/apiEndpointCalls';
import { formatGameInCollection } from '@network/dataFormatters';

const { userCollections: userCollectionsKey } = QueryKeys;

const useGameInCollectionQuery = (gameId: number) => {
  const queryFunction: QueryFunction<GameInCollectionsResponse, QueryKey, number> = async () => {
    return fetchGameInCollection(gameId);
  };

  const { data, isPending, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: [userCollectionsKey, gameId],
    queryFn: queryFunction,
    staleTime: 10 * 60 * 1000,
  });

  const gameInCollections = useMemo(() => {
    if (!data) {
      return [];
    }

    const seenIds = new Set();

    return data
      .filter((game) => {
        if (seenIds.has(game.id)) {
          return false;
        }

        seenIds.add(game.id);
        return true;
      })
      .map(formatGameInCollection);
  }, [data]);

  return { gameInCollections, isPending, isSuccess, refetch, isRefetching };
};

export default useGameInCollectionQuery;
