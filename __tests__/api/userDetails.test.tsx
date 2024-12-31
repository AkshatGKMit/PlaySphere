import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { describe, it } from '@jest/globals';

import ApiConstants from '@network/apiConstants';
import { fetchCurrentUser } from '@network/apiEndpointCalls';
import instance from '@network/instance';
import { USER_TOKEN } from '@env';

const { current: currentUserEndpoint } = ApiConstants.endpoints.user;

const mockedAxios = new AxiosMockAdapter(axios);

describe('UserDetailsResponse API Test', () => {
  it('should match the expected keys in UserDetailsResponse', async () => {
    const mockUserResponse: UserDetailsResponse = {
      id: 188,
      username: 'Doodoser',
      email: 'doodoser@gmail.com',
      slug: 'doodoser',
      full_name: '',
      avatar: null,
      bio: '',
      games_count: 145,
      games_wishlist_count: 0,
      collections_count: 0,
      game_background: null,
      following_count: 0,
      share_image:
        'https://media.rawg.io/media/api/images/users/db8/db8940218e17188bee12777d4a9647b7_188.jpg',
      rated_games_percent: 0,
      noindex: true,
      bio_raw: '',
    };

    mockedAxios.onGet(currentUserEndpoint).replyOnce(200, mockUserResponse);

    instance.interceptors.request.use((requestConfig) => {
      requestConfig.headers.set('token', USER_TOKEN);
      return requestConfig;
    });

    fetchCurrentUser();
  });
});
