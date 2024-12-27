import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { describe, beforeEach, afterEach, jest, expect, it } from '@jest/globals';

import { fetchUserOverview } from '@network/apiEndpointCalls';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserDetailsResponse API Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

    const mockedResponse: AxiosResponse = {
      data: mockUserResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {
          'Content-Type': '',
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    expect(axios.get).not.toHaveBeenCalled();
    const data = await fetchUserOverview(188);
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(mockUserResponse);

    // jest.fn().mockImplementationOnce(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve(mockUserResponse),
    //   }),
    // );

    // expect(userDetails).toMatchObject({
    //   id: expect.any(Number),
    //   username: expect.any(String),
    //   email: expect.any(null),
    //   slug: expect.any(String),
    //   full_name: expect.any(String || null),
    //   avatar: expect.any(String || null),
    //   games_count: expect.any(Number),
    //   collections_count: expect.any(Number),
    //   bio: expect.any(String || null),
    //   games_wishlist_count: expect.any(Number),
    //   game_background: expect.any(null),
    //   following_count: expect.any(Number),
    //   share_image: expect.any(String || null),
    //   rated_games_percent: expect.any(Number),
    //   noindex: expect.any(Boolean),
    //   bio_raw: expect.any(String || null),
    // });
  });
});
