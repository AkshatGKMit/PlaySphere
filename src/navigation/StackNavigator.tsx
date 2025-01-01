import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes, TestIds } from '@constants';
import ApiConstants from '@network/apiConstants';
import Collections from '@screens/collections/Collections';
import CollectionGames from '@screens/collectionGames/CollectionGames';
import Details from '@screens/details/Details';
import Home from '@screens/home/Home';
import Search from '@screens/search/Search';
import { globalStyles } from '@themes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const {
  details: detailsRoute,
  home: homeRoute,
  search: searchRoute,
  collections: collectionsRoute,
  collectionGames: collectionGamesRoute,
} = Routes.Stack;
const { list: listGamesEndpoint } = ApiConstants.endpoints.games;

const { root: rootTestId } = TestIds.integration.stackNavigator;

const StackNavigator = () => (
  <View
    style={globalStyles.flex1}
    testID={rootTestId}
  >
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
      <Stack.Screen
        name={detailsRoute}
        component={Details}
      />
    </Stack.Navigator>
  </View>
);

export default StackNavigator;
