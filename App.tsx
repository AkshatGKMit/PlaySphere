import React, { useEffect } from 'react';
import { useColorScheme, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import Dialog from '@components/dialog';
import Navigator from '@navigation/Navigator';
import store, { useAppDispatch } from '@store';
import { fetchTokenFromStorage } from '@store/reducers/auth';
import { switchTheme } from '@store/reducers/theme';
import { ThemeMode } from '@themes';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <SafeAreaProvider>
          <Main />
          <Dialog />
        </SafeAreaProvider>
      </PersistQueryClientProvider>
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
