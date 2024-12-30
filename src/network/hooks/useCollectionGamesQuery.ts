import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { QueryFunction, QueryKey, useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import { QueryKeys } from '@constants';
import { fetchCollectionGames } from '@network/apiEndpointCalls';
import { parseUrl } from '@utility/helpers';
import { formatGameDetail } from '@network/dataFormatters';

const { collectionGames: collectionGamesKey } = QueryKeys;

const useCollectionGamesQuery = (
  collectionId: number,
  enabled: boolean = true,
  params?: ListQueryParams,
) => {
  const queryFunction: QueryFunction<
    AxiosResponse<PaginatedGamesResponse>,
    QueryKey,
    string
  > = async ({ pageParam }) => {
    const paramsPage = params?.page;
    const { page: searchParamsPage } = parseUrl<ListQueryParams>(pageParam).searchParams;

    return fetchCollectionGames(collectionId, {
      ...params,
      page: searchParamsPage ?? paramsPage ?? 1,
    });
  };

  function getNextPageParam(
    lastPage: AxiosResponse<PaginatedGamesResponse, any>,
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
    AxiosResponse<PaginatedGamesResponse>,
    Error,
    InfiniteData<AxiosResponse<PaginatedGamesResponse>>,
    QueryKey,
    string
  >({
    queryKey: [collectionGamesKey, collectionId],
    queryFn: queryFunction,
    getNextPageParam,
    initialPageParam: '',
    enabled,
  });

  const collectionGames: Games = useMemo(() => {
    const collectionIdSet = new Set();

    const allCollections = data?.pages.flatMap((page) => page.data.results) ?? [];

    const formattedCollections = allCollections.reduce<Games>((acc, game) => {
      const { id } = game;

      if (!collectionIdSet.has(id)) {
        collectionIdSet.add(id);
        acc.push(formatGameDetail(game));
      }

      return acc;
    }, []);

    return formattedCollections;
  }, [data]);

  return {
    collectionGames,
    isSuccess,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
};

export default useCollectionGamesQuery;
