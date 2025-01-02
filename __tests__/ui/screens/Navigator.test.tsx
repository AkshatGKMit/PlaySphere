import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { TestIds } from '@constants';
import Navigator from '@navigation/Navigator';
import { setupStore } from '@store';
import { render } from '@utility/test';

const { splash: splashIds, auth: authIds, stackNavigator: stackNavigatorId } = TestIds.integration;

describe('<Navigator />', () => {
  it('Renders Splash Screen when isAuthorized is null', () => {
    const store = setupStore({
      auth: {
        isAuthorized: null,
        isLogin: false,
      },
    });

    render(<Navigator />, { store });

    expect(screen.getByTestId(splashIds.root)).toBeTruthy();
  });

  it('Renders Auth Screen when not Authorized', () => {
    const store = setupStore({
      auth: {
        isAuthorized: false,
        isLogin: false,
      },
    });

    render(<Navigator />, { store });

    expect(screen.getByTestId(authIds.root)).toBeTruthy();
  });

  it('Renders Stack Navigator when Authorized and login true', async () => {
    const store = setupStore({
      auth: {
        isAuthorized: true,
        isLogin: true,
      },
    });

    render(<Navigator />, { store });

    expect(screen.getByTestId(stackNavigatorId.root)).toBeTruthy();
  });
});
