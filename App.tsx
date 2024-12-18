import React, { useEffect } from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import { APP_NAME } from '@constants';
import store, { useAppDispatch } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { ThemeMode } from '@themes';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme, dispatch]);

  return (
    <View>
      <Text>{APP_NAME}</Text>
    </View>
  );
};

export default App;
