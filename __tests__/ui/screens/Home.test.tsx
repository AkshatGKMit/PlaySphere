import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { act, fireEvent, waitFor } from '@testing-library/react-native';

import { TestIds } from '@constants';
import ApiConstants from '@network/apiConstants';
import Home from '@screens/home/Home';
import { setupStore } from '@store';
import { render } from '@utility/test';

const { integration: integrationIds, unit: unitIds } = TestIds;
const { home: homeTestIds } = integrationIds;
const {
  root: rootId,
  rootButton: rootButtonId,
  popular: popularId,
  thisWeek: thisWeekId,
} = unitIds.floatingDrawer;

const {
  list: listGamesEndpoints,
  thisWeekGames: thisWeekGamesEndpoint,
  bestOfTheYear: bestGamesOfYearEndpoint,
} = ApiConstants.endpoints.games;

describe('<Home/>', () => {
  const store = setupStore({
    auth: {
      isAuthorized: true,
      isLogin: true,
    },
  });

  const setMockParams = (mockParams: HomeRouteProps) => {
    require('@react-navigation/native').useRoute.mockReturnValue({
      params: mockParams,
    });
  };

  const openDrawerAndTriggerAndVerifyTitle = async (buttonId: string, title: string) => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Home />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const drawerButton = await waitFor(() => getByTestId(rootButtonId));
    fireEvent.press(drawerButton);

    expect(getByTestId(rootId)).toBeTruthy();

    fireEvent.press(await waitFor(() => getByTestId(buttonId)));

    const homeTitle = await waitFor(() => getByTestId(homeTestIds.title));
    expect(homeTitle.children[0]).toEqual(title);
  };

  it('Renders Popular Games Home Screen', async () => {
    const mockParams: HomeRouteProps = {
      title: 'Popular Games',
      url: listGamesEndpoints,
    };

    setMockParams(mockParams);

    jest.useFakeTimers();
    const { getByTestId } = render(<Home />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const screen = await waitFor(() => getByTestId(homeTestIds.root));
    const screenTitle = await waitFor(() => getByTestId(homeTestIds.title));

    expect(screen).toBeTruthy();
    expect(screenTitle.children[0]).toEqual(mockParams.title);
  });

  it('Renders This Week Games on Home Screen', async () => {
    const mockParams: HomeRouteProps = {
      title: 'This Week Games',
      url: thisWeekGamesEndpoint,
    };

    setMockParams(mockParams);

    jest.useFakeTimers();
    const { getByTestId } = render(<Home />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const screen = await waitFor(() => getByTestId(homeTestIds.root));
    const screenTitle = await waitFor(() => getByTestId(homeTestIds.title));

    expect(screen).toBeTruthy();
    expect(screenTitle.children[0]).toEqual(mockParams.title);
  });

  it('Renders Best of the Year Games on Home Screen', async () => {
    const mockParams: HomeRouteProps = {
      title: 'Best Games of Year',
      url: bestGamesOfYearEndpoint,
    };

    setMockParams(mockParams);

    jest.useFakeTimers();
    const { getByTestId } = render(<Home />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const screen = await waitFor(() => getByTestId(homeTestIds.root));
    const screenTitle = await waitFor(() => getByTestId(homeTestIds.title));

    expect(screen).toBeTruthy();
    expect(screenTitle.children[0]).toEqual(mockParams.title);
  });

  it('Switch Home Screen', async () => {
    setMockParams({
      title: 'Popular Games',
      url: listGamesEndpoints,
    });

    await openDrawerAndTriggerAndVerifyTitle(popularId, 'Popular Games');

    setMockParams({
      title: 'This Week Games',
      url: thisWeekGamesEndpoint,
    });

    await openDrawerAndTriggerAndVerifyTitle(thisWeekId, 'This Week Games');

    setMockParams({
      title: 'This Week Games',
      url: thisWeekGamesEndpoint,
    });
  });
});
