import { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { QueryFunction, QueryKey, useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import { QueryKeys } from '@constants';
import { fetchUserCollections } from '@network/apiEndpointCalls';
import { formatCollection } from '@network/dataFormatters';
import { useAppSelector } from '@store';
import { parseUrl } from '@utility/helpers';

const { myCollections: myCollectionsKey } = QueryKeys;

const useCollectionQuery = (params?: ListQueryParams) => {
  const { user } = useAppSelector((state) => state.user);

  const queryFunction: QueryFunction<
    AxiosResponse<PaginatedCollectionDetailsResponse>,
    QueryKey,
    string
  > = async ({ pageParam }) => {
    const paramsPage = params?.page;
    const { page: searchParamsPage } = parseUrl<ListQueryParams>(pageParam).searchParams;

    return fetchUserCollections(user!.id, {
      ...params,
      page: searchParamsPage ?? paramsPage ?? 1,
    });
  };

  function getNextPageParam(
    lastPage: AxiosResponse<PaginatedCollectionDetailsResponse, any>,
  ): string | null | undefined {
    const { next: nextPageParam } = lastPage.data;

    return nextPageParam;
  }

  const {
    data,
    isSuccess,
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery<
    AxiosResponse<PaginatedCollectionDetailsResponse>,
    Error,
    InfiniteData<AxiosResponse<PaginatedCollectionDetailsResponse>>,
    QueryKey,
    string
  >({
    queryKey: [myCollectionsKey, user?.id],
    queryFn: queryFunction,
    getNextPageParam,
    initialPageParam: '',
    enabled: !!user?.id,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const collections: Collections = useMemo(() => {
    const allCollections = data?.pages.flatMap((page) => page.data.results) ?? [];

    return allCollections.map(formatCollection);
  }, [data]);

  return {
    collections,
    isSuccess,
    loading: isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  };
};

export default useCollectionQuery;
