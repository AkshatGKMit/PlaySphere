import { NavigationProp } from '@react-navigation/native';

import { Routes } from '@constants';

const { Stack } = Routes;

const { home: homeRoute, details: detailsRoute, collectionGames: collectionGamesRoute } = Stack;

type GetParams<T extends StackScreenNames> = T extends typeof detailsRoute
  ? { id: number }
  : T extends typeof homeRoute
  ? HomeRouteProps
  : T extends typeof collectionGamesRoute
  ? CollectionGamesRouteProps
  : undefined;

declare global {
  type HomeRouteProps = {
    url: string;
    title: string;
    params?: ListQueryParams;
  };

  type CollectionGamesRouteProps = {
    collectionId: number;
    collectionName: string;
  };

  type StackScreenNames = (typeof Stack)[keyof typeof Stack];
  type RootStackParamList = {
    [K in StackScreenNames]: GetParams<K>;
  };
  type StackNavigation = NavigationProp<RootStackParamList>;
}
