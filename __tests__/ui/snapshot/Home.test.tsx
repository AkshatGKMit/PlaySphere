import React from 'react';
import { it, describe, expect } from '@jest/globals';

import ApiConstants from '@network/apiConstants';
import Home from '@screens/home/Home';
import { setupStore } from '@store';
import { render } from '@utility/test';

const { list: listGamesEndpoints } = ApiConstants.endpoints.games;

describe('Home Screen Snapshot', () => {
  const store = setupStore({
    auth: {
      isAuthorized: true,
      isLogin: true,
    },
  });

  it('Always Render Same Home Screen', () => {
    const mockParams: HomeRouteProps = {
      title: 'Popular Games',
      url: listGamesEndpoints,
    };

    require('@react-navigation/native').useRoute.mockReturnValue({
      params: mockParams,
    });

    const homeTree = render(<Home />, { store }).toJSON();

    expect(homeTree).toMatchSnapshot();
  });
});
