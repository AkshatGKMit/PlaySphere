import React from 'react';
import { describe, it, expect, jest, afterEach } from '@jest/globals';
import { act, waitFor } from '@testing-library/react-native';

import { TestIds } from '@constants';
import Splash from '@screens/splash/Splash';
import { setupStore } from '@store';
import { render } from '@utility/test';
import { usePrefetchInfiniteQuery } from '@tanstack/react-query';

const { integration: integrationTestIds, unit: unitTestIds } = TestIds;

const { root: rootId } = integrationTestIds.splash;
const { bannerImageView: bannerImageViewIds, appIntro: appIntroIds } = unitTestIds;

describe('<Splash/>', () => {
  const onReadyMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders Splash Screen', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Splash onReady={onReadyMock} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(getByTestId(rootId)).toBeTruthy();
    expect(getByTestId(bannerImageViewIds.root)).toBeTruthy();
    expect(getByTestId(appIntroIds.root)).toBeTruthy();
  });

  it('Does Not Calls OnReady when Authorized is null', async () => {
    const store = setupStore({
      auth: {
        isAuthorized: null,
        isLogin: false,
      },
    });

    const mockDispatch = jest.spyOn(store, 'dispatch');

    jest.useFakeTimers();
    render(<Splash onReady={onReadyMock} />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(mockDispatch).not.toBeCalled();

    expect(onReadyMock).not.toBeCalled();
  });

  it('Does Not Dispatches Current User When Not Authorized', async () => {
    const store = setupStore({
      auth: {
        isAuthorized: false,
        isLogin: false,
      },
    });

    const mockDispatch = jest.spyOn(store, 'dispatch');

    jest.useFakeTimers();
    render(<Splash onReady={onReadyMock} />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(mockDispatch).not.toBeCalled();

    expect(onReadyMock).toHaveBeenCalledWith(false);
  });

  it('Dispatches Current User When Authorized', async () => {
    const store = setupStore({
      auth: {
        isAuthorized: true,
        isLogin: false,
      },
    });

    const mockDispatch = jest.spyOn(store, 'dispatch');

    jest.useFakeTimers();
    render(<Splash onReady={onReadyMock} />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
      expect(mockDispatch).toBeCalledTimes(1);
    });
  });

  it('Prefetch Home Page Game List', async () => {
    jest.useFakeTimers();
    render(<Splash onReady={onReadyMock} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    await waitFor(() => {
      expect(usePrefetchInfiniteQuery).toHaveBeenCalledTimes(1);
    });
  });
});
