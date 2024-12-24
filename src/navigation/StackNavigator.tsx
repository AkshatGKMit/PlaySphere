import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from '@constants';
import ApiConstants from '@network/apiConstants';
import useUserQuery from '@network/hooks/useUserQuery';
import Collections from '@screens/collections/Collections';
import CollectionGames from '@screens/collectionGames/CollectionGames';
import Details from '@screens/details/Details';
import Home from '@screens/home/Home';
import Search from '@screens/search/Search';

const Stack = createNativeStackNavigator<RootStackParamList>();

const {
  details: detailsRoute,
  home: homeRoute,
  search: searchRoute,
  collections: collectionsRoute,
  collectionGames: collectionGamesRoute,
} = Routes.Stack;
const { list: listGamesEndpoint } = ApiConstants.endpoints.games;

const StackNavigator = () => {
  useUserQuery();

  return (
    <Stack.Navigator screenOptions={{ animation: 'fade', headerShown: false }}>
      <Stack.Screen
        name={homeRoute}
        component={Home}
        initialParams={{ url: listGamesEndpoint, title: 'Popular Games' }}
      />
      <Stack.Screen
        name={searchRoute}
        component={Search}
      />
      <Stack.Screen
        name={collectionsRoute}
        component={Collections}
      />
      <Stack.Screen
        name={collectionGamesRoute}
        component={CollectionGames}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
