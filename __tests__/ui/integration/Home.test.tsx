import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { waitFor } from '@testing-library/react-native';

import { TestIds } from '@constants';
import Home from '@screens/home/Home';
import ApiConstants from '@network/apiConstants';
import { setupStore } from '@store';
import { render } from '@utility/test';

const { integration: integrationIds, unit: unitIds } = TestIds;
const { home: homeTestIds } = integrationIds;
const {
  root: rootId,
  rootButton: rootButtonId,
  popular: popularId,
  thisWeek: thisWeekId,
  bestOfTheYear: bestOfTheYearId,
  popular2023: popular2023Id,
  top250: top250Id,
} = unitIds.floatingDrawer;

const {
  list: listGamesEndpoints,
  thisWeekGames: thisWeekGamesEndpoint,
  bestOfTheYear: bestGamesOfYearEndpoint,
  popularIn2023: popularIn2023Endpoint,
  mostPopular: top250GamesEndpoint,
} = ApiConstants.endpoints.games;

const setMockParams = (mockParams: HomeRouteProps) => {
  require('@react-navigation/native').useRoute.mockReturnValue({
    params: mockParams,
  });
};

describe('<Home/>', () => {
  const store = setupStore({
    auth: {
      isAuthorized: true,
      isLogin: true,
    },
  });

  it('Renders Popular Games Home Screen', async () => {
    const mockParams: HomeRouteProps = {
      title: 'Popular Games',
      url: listGamesEndpoints,
    };

    setMockParams(mockParams);

    const { getByTestId } = render(<Home />, { store });

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

    const { getByTestId } = render(<Home />, { store });

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

    const { getByTestId } = render(<Home />, { store });

    const screen = await waitFor(() => getByTestId(homeTestIds.root));
    const screenTitle = await waitFor(() => getByTestId(homeTestIds.title));

    expect(screen).toBeTruthy();
    expect(screenTitle.children[0]).toEqual(mockParams.title);
  });
});
