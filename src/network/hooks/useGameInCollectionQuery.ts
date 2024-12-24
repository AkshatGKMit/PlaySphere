import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

import useOnlineStatus from '@config/useOnlineStatus';
import { QueryKeys } from '@constants';
import { fetchGameInCollection } from '@network/apiEndpointCalls';
import { formatGameInCollection } from '@network/dataFormatters';

const { userCollections: userCollectionsKey } = QueryKeys;

const useGameInCollectionQuery = (gameId: number) => {
  const queryFunction: QueryFunction<
    AxiosResponse<GameInCollectionsResponse>,
    QueryKey,
    number
  > = async () => {
    return fetchGameInCollection(gameId);
  };

  const { data, isPending, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: [userCollectionsKey, gameId],
    queryFn: queryFunction,
    staleTime: 10 * 60 * 1000,
  });

  const online = useOnlineStatus(!data);

  const gameInCollections = useMemo(
    () => (data ? data.data.map(formatGameInCollection) : []),
    [data],
  );

  return { gameInCollections, online, isPending, isSuccess, refetch, isRefetching };
};

export default useGameInCollectionQuery;
