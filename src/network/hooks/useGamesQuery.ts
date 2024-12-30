import { useEffect, useMemo } from 'react';
import { QueryFunction, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { fetchGames } from '@network/apiEndpointCalls';
import { formatGameDetail } from '@network/dataFormatters';
import { parseUrl } from '@utility/helpers';

const useGamesQuery = (key: GameQueryKey, config?: GameQueryConfig) => {
  const [_, url, params] = key;
  const { enabled = true, onError, onSuccess } = config ?? {};

  const queryFunction: QueryFunction<PaginatedGamesResponse, QueryKey, string> = async ({
    pageParam,
  }) => {
    const paramsPage = params?.page;
    const { page: searchParamsPage } = parseUrl<ListQueryParams>(pageParam).searchParams;

    return fetchGames(url, { ...params, page: searchParamsPage ?? paramsPage ?? 1 });
  };

  function getNextPageParam(lastPage: PaginatedGamesResponse): string | null | undefined {
    const { next: nextPageParam } = lastPage;

    return nextPageParam;
  }

  function getPreviousPageParam(firstPage: PaginatedGamesResponse): string | null | undefined {
    const { previous } = firstPage;

    return previous;
  }

  const {
    data,
    isSuccess,
    isError,
    error,
    hasPreviousPage,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: key,
    queryFn: queryFunction,
    getNextPageParam,
    getPreviousPageParam,
    initialPageParam: url,
    networkMode: 'offlineFirst',
    staleTime: Infinity,
    enabled,
  });

  useEffect(() => {
    if (isError) {
      onError?.(error);
    }
  }, [isError, onError, error]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(data);
    }
  }, [isSuccess, onSuccess, data]);

  const games: Games = useMemo(() => {
    const gameIdSet = new Set();

    const allGames = data?.pages.flatMap((page) => page.results) ?? [];

    const formattedGames = allGames.reduce<Games>((acc, game) => {
      const { id } = game;

      if (!gameIdSet.has(id)) {
        gameIdSet.add(id);
        acc.push(formatGameDetail(game));
      }

      return acc;
    }, []);

    return formattedGames;
  }, [data]);

  return {
    games,
    hasPreviousPage,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    isPending,
  };
};

export default useGamesQuery;
