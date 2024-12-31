import React, { useEffect } from 'react';
import { View } from 'react-native';
import { QueryFunction, QueryKey, usePrefetchInfiniteQuery } from '@tanstack/react-query';

import AppIntro from '@components/appIntro';
import BannerImageView from '@components/bannerImageView';
import useStyles from '@config/useStyles';
import { orderByDropdownItems, QueryKeys, TestIds } from '@constants';
import ApiConstants from '@network/apiConstants';
import { fetchGames } from '@network/apiEndpointCalls';
import { useAppDispatch, useAppSelector } from '@store';
import { fetchCurrentUserAction } from '@store/actions/userActions';

import ThemedStyles from './styles';

const { list: listGamesEndpoint } = ApiConstants.endpoints.games;
const { mainGameList: mainGameListKey } = QueryKeys;
const { root: rootTestId } = TestIds.integration.splash;

const Splash = ({ onReady }: { onReady: (value: boolean) => void }) => {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.auth);

  const gameQueryParams: ListQueryParams = {
    ordering: orderByDropdownItems[0].value as string,
    platforms: undefined,
  };

  const queryFunction: QueryFunction<PaginatedGamesResponse, QueryKey, string> = async () => {
    return fetchGames(listGamesEndpoint, { ...gameQueryParams, page: 1 });
  };

  usePrefetchInfiniteQuery({
    queryKey: [mainGameListKey, listGamesEndpoint, gameQueryParams],
    queryFn: queryFunction,
    getNextPageParam: () => '',
    initialPageParam: listGamesEndpoint,
  });

  useEffect(() => {
    if (isAuthorized !== null) {
      dispatch(fetchCurrentUserAction());
      if (isAuthorized) {
        setTimeout(() => {
          onReady(isAuthorized);
        }, 1500);
      }
      onReady(isAuthorized);
    }
  }, [dispatch, isAuthorized, onReady]);

  const styles = useStyles(ThemedStyles);

  return (
    <View
      style={styles.backgroundContainer}
      testID={rootTestId}
    >
      <BannerImageView />
      {AppIntro()}
    </View>
  );
};

export default Splash;
