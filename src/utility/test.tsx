import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render as renderFunction } from '@testing-library/react-native';

import { setupStore } from '@store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const render = (ui: ReactElement, extendedOptions: ExtendedRenderOptions = {}) => {
  const { preloadedState = {}, store = setupStore(preloadedState) } = extendedOptions ?? {};

  const ReduxWrapper = ({ children }: ChildrenWrapper) => {
    return (
      <SafeAreaProvider>
        <Provider store={store}>{children}</Provider>
      </SafeAreaProvider>
    );
  };

  return renderFunction(ui, { wrapper: ReduxWrapper, ...extendedOptions });
};
