import { API_BASE_URL, API_KEY } from '@env';

const ApiConstants = {
  BASE_URL: API_BASE_URL,
  developerKey: API_KEY,
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },
    user: {
      current: '/users/current',
      overview: (userId: number) => `/users/${userId}`,
      allGames: (userId: number) => `/users/${userId}/games`,
      recentGames: (userId: number) => `/users/${userId}/games/recently`,
      statistics: (userId: number) => `/users/${userId}/statistics`,
      favorites: '/users/current/favorites',
      addToFavorites: '/users/current/favorites',
      removeFromFavorites: (position: number) => `/users/current/favorites/${position}`,
      genres: (userId: number) => `/users/${userId}/games/genres`,
      myCollections: (userId: number) => `/users/${userId}/collections`,
    },
    collections: {
      collectionFeed: (collectionId: number) => `/collections/${collectionId}/feed`,
      addNewCollection: '/collections',
      updateDeleteCollection: (collectionId: number) => `/collections/${collectionId}`,
    },
    games: {
      list: '/games',
      main: '/games/lists/main',
      mostPopular: '/games/lists/popular',
      bestOfTheYear: '/games/lists/greatest',
      listCalendarMonthGames: (year: number, month: number) => `/games/calendar/${year}/${month}`,
      listSitemapsOfGames: (letter: string) => `/games/sitemap?letter=${letter}`,
      details: (gameId: number) => `/games/${gameId}`,
      screenshots: (gameId: number) => `/games/${gameId}/screenshots`,
      movies: (gameId: number) => `/games/${gameId}/movies`,
      collections: (gameId: number) => `/games/${gameId}/collections`,
      reddit: (gameId: number) => `/games/${gameId}/reddit`,
      addToLibrary: '/users/current/games',
      removeFromLibrary: (gameId: number) => `/users/current/games/${gameId}`,
      updateLibraryStatus: (gameId: number) => `/users/current/games/${gameId}`,
      addToCollection: (collectionId: number) => `/collections/${collectionId}/games`,
      removeFromCollection: (collectionId: number, feedId: number) =>
        `/collections/${collectionId}/feed/${feedId}`,
    },
    leaderboards: {
      top30: '/leaderboard',
      topLeaderboardsOfGame: (gameId: number) => `/leaderboard/games/${gameId}`,
    },
    tags: {
      list: '/tags',
      details: (tagId: number) => `/tags/${tagId}`,
    },
    systemPlatforms: {
      list: '/platforms',
      details: (platformId: number) => `/platforms/${platformId}`,
      systemPlatformGames: (platformId: number) => `/games?platforms=${platformId}`,
    },
  },
};

export default ApiConstants;
