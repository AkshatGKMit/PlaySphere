import React, { useEffect } from 'react';
import { useColorScheme, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dialog from '@components/dialog';
import Navigator from '@navigation/Navigator';
import store, { useAppDispatch } from '@store';
import { fetchTokenFromStorage } from '@store/reducers/auth';
import { switchTheme } from '@store/reducers/theme';
import { ThemeMode } from '@themes';

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Main />
          <Dialog />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const Main = () => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme, dispatch]);

  useEffect(() => {
    dispatch(fetchTokenFromStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
