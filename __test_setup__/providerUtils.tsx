import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';

import { setupStore } from '@store';

export const renderReduxProvider = (
  ui: ReactElement,
  extendedOptions: ExtendedRenderOptions = {},
) => {
  const { preloadedState = {}, store = setupStore(preloadedState) } = extendedOptions ?? {};

  const ReduxWrapper = ({ children }: ProviderWrapper) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return render(ui, { wrapper: ReduxWrapper, ...extendedOptions });
};
