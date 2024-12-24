import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { QueryFunction, QueryKey, useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import useOnlineStatus from '@config/useOnlineStatus';
import { QueryKeys } from '@constants';
import { fetchCollectionFeed } from '@network/apiEndpointCalls';
import { formatCollectionFeed } from '@network/dataFormatters';
import { parseUrl } from '@utility/helpers';

const { collectionGames: collectionGamesKey } = QueryKeys;

const useCollectionFeedsQuery = (collectionId: number, params?: ListQueryParams) => {
  const queryFunction: QueryFunction<
    AxiosResponse<PaginatedCollectionFeedsResponse>,
    QueryKey,
    string
  > = async ({ pageParam }) => {
    const paramsPage = params?.page;
    const { page: searchParamsPage } = parseUrl<ListQueryParams>(pageParam).searchParams;

    return fetchCollectionFeed(collectionId, {
      ...params,
      page: searchParamsPage ?? paramsPage ?? 1,
    });
  };

  function getNextPageParam(
    lastPage: AxiosResponse<PaginatedCollectionFeedsResponse, any>,
  ): string | null | undefined {
    const { next: nextPageParam } = lastPage.data;

    return nextPageParam;
  }

  const {
    data,
    isSuccess,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery<
    AxiosResponse<PaginatedCollectionFeedsResponse>,
    Error,
    InfiniteData<AxiosResponse<PaginatedCollectionFeedsResponse>>,
    QueryKey,
    string
  >({
    queryKey: [collectionGamesKey, collectionId],
    queryFn: queryFunction,
    getNextPageParam,
    initialPageParam: '',
    retryOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const online = useOnlineStatus(!data);

  const collectionFeeds: CollectionFeeds = useMemo(() => {
    const collectionIdSet = new Set();

    const allCollections = data?.pages.flatMap((page) => page.data.results) ?? [];

    const formattedCollections = allCollections.reduce<CollectionFeeds>((acc, collection) => {
      const { id } = collection;

      if (!collectionIdSet.has(id)) {
        collectionIdSet.add(id);
        acc.push(formatCollectionFeed(collection));
      }

      return acc;
    }, []);

    return formattedCollections;
  }, [data]);

  return {
    collectionFeeds,
    isSuccess,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    online,
    refetch,
    isRefetching,
  };
};

export default useCollectionFeedsQuery;
