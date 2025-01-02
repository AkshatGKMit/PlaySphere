import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { describe, it, expect } from '@jest/globals';

import ApiConstants from '@network/apiConstants';
import { fetchCurrentUser } from '@network/apiEndpointCalls';
import instance from '@network/instance';
import { USER_TOKEN } from '@env';
import { formatUserDetails } from '@network/dataFormatters';

const { current: currentUserEndpoint } = ApiConstants.endpoints.user;

const mockedAxios = new AxiosMockAdapter(axios);

describe('UserDetailsResponse API Test', () => {
  it('should match the expected keys in UserDetailsResponse', async () => {
    const mockUserResponse: User = {
      id: 188,
      username: 'Doodoser',
      email: 'doodoser@gmail.com',
      slug: 'doodoser',
      avatar: '',
      bio: '',
      fullName: '',
      gamesCount: 0,
      collectionsCount: 0,
    };

    mockedAxios.onGet(currentUserEndpoint).replyOnce(200, mockUserResponse);

    instance.interceptors.request.use((requestConfig) => {
      requestConfig.headers.set('token', USER_TOKEN);
      return requestConfig;
    });

    const response = await fetchCurrentUser();

    expect(formatUserDetails(response)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        slug: expect.any(String),
        avatar: expect.any(String),
        bio: expect.any(String),
        fullName: expect.any(String),
        gamesCount: expect.any(Number),
        collectionsCount: expect.any(Number),
      }),
    );
  });
});
