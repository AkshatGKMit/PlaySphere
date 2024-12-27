import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { AxiosResponse } from 'axios';
import {
  QueryFunction,
  QueryKey,
  usePrefetchInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

import AppIntro from '@components/appIntro';
import BannerImageView from '@components/bannerImageView';
import useStyles from '@config/useStyles';
import { orderByDropdownItems, QueryKeys } from '@constants';
import ApiConstants from '@network/apiConstants';
import { fetchCurrentUser, fetchGames, fetchUserOverview } from '@network/apiEndpointCalls';
import { useAppSelector } from '@store';

import ThemedStyles from './styles';

const { list: listGamesEndpoint } = ApiConstants.endpoints.games;
const {
  mainGameList: mainGameListKey,
  currentUser: currentUserKey,
  userDetails: userDetailsKey,
} = QueryKeys;

const Splash = ({ onReady }: { onReady: (value: boolean) => void }) => {
  const queryClient = useQueryClient();

  const { isAuthorized } = useAppSelector((state) => state.auth);

  const gameQueryParams: ListQueryParams = {
    ordering: orderByDropdownItems[0].value as string,
    platforms: undefined,
  };

  const queryFunction: QueryFunction<
    AxiosResponse<PaginatedGamesResponse>,
    QueryKey,
    string
  > = async () => {
    return fetchGames(listGamesEndpoint, { ...gameQueryParams, page: 1 });
  };

  usePrefetchInfiniteQuery({
    queryKey: [mainGameListKey, listGamesEndpoint, gameQueryParams],
    queryFn: queryFunction,
    getNextPageParam: () => '',
    initialPageParam: listGamesEndpoint,
  });

  const prefetchUserQueries = useCallback(async () => {
    const { data } = await queryClient.fetchQuery({
      queryKey: [currentUserKey],
      queryFn: () => fetchCurrentUser(),
    });

    const { id } = data;

    await queryClient.prefetchQuery({
      queryKey: [userDetailsKey, id],
      queryFn: () => fetchUserOverview(id!),
    });
  }, [queryClient]);

  useEffect(() => {
    if (isAuthorized !== null) {
      prefetchUserQueries();

      if (isAuthorized) {
        setTimeout(() => {
          onReady(isAuthorized);
        }, 1500);
      }
      onReady(isAuthorized);
    }
  }, [isAuthorized, onReady, prefetchUserQueries]);

  const styles = useStyles(ThemedStyles);

  return (
    <View style={styles.backgroundContainer}>
      <BannerImageView />
      {AppIntro()}
    </View>
  );
};

export default Splash;
