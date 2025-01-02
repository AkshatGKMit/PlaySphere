import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { render as renderFunction } from '@testing-library/react-native';

import { setupStore } from '@store';

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const render = (ui: ReactElement, extendedOptions: ExtendedRenderOptions = {}) => {
  const { preloadedState = {}, store = setupStore(preloadedState) } = extendedOptions ?? {};

  const Wrapper = ({ children }: ChildrenWrapper) => {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
          >
            <NavigationContainer>{children}</NavigationContainer>
          </PersistQueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    );
  };

  return renderFunction(ui, { wrapper: Wrapper, ...extendedOptions });
};
