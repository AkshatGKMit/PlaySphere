import ApiConstants from './apiConstants';
import { _delete, _get, _patch, _post } from './instanceMethods';

const {
  auth: authEndpoints,
  user: userEndpoints,
  games: gamesEndpoint,
  collections: collectionsEndpoint,
  leaderboards: leaderboardsEndpoint,
  systemPlatforms: systemsEndpoint,
  tags: tagsEndpoint,
} = ApiConstants.endpoints;

const { login: loginEndpoint, register: registerEndpoint } = authEndpoints;

export async function requestLogin(loginData: LoginBody) {
  const response = await _post<AuthSuccessResponse, AuthErrorResponse, LoginBody>(
    loginEndpoint,
    loginData,
  );

  return response;
}

export async function requestSignUp(signUpData: RegisterBody) {
  const response = await _post<AuthSuccessResponse, AuthErrorResponse, RegisterBody>(
    registerEndpoint,
    signUpData,
  );

  return response;
}

const {
  current: currentUserEndpoint,
  overview: userOverviewEndpoint,
  addToFavorites: addToFavoritesEndpoint,
  removeFromFavorites: removeFromFavoritesEndpoint,
  statistics: userStatsEndpoint,
  genres: userGenreEndpoint,
  myCollections: userCollectionsEndpoint,
} = userEndpoints;

export async function fetchCurrentUser() {
  const response = await _get<UserDetailsResponse>(currentUserEndpoint);

  return response;
}

export async function fetchUserOverview(userId: number) {
  const response = await _get<UserDetailsResponse>(userOverviewEndpoint(userId));

  return response;
}

export async function fetchUserStats(userId: number) {
  const response = await _get<UserStats>(userStatsEndpoint(userId));

  return response;
}

export async function fetchUserGenre(userId: number, params?: ListQueryParams) {
  const response = await _get<UserGenreResponse>(userGenreEndpoint(userId), {
    params,
  });

  return response;
}

export async function fetchUserCollections(userId: number, params?: ListQueryParams) {
  const response = await _get<PaginatedCollectionDetailsResponse>(userCollectionsEndpoint(userId), {
    params,
  });

  return response;
}

export async function requestAddToFavorites(requestBody: AddGameToFavoriteBody) {
  const response = await _post<AddGameToFavoriteBody, AddGameToFavoriteBody>(
    addToFavoritesEndpoint,
    requestBody,
  );

  return response;
}

export async function requestRemoveFavorites(position: number) {
  const response = await _delete<{}, DetailErrorResponse>(removeFromFavoritesEndpoint(position));

  return response;
}

const {
  details: gameDetailsEndpoint,
  movies: gameMoviesEndpoint,
  reddit: gameRedditPostsEndpoint,
  screenshots: gameScreenshotsEndpoint,
  collections: gameCollectionsEndpoint,
  addToLibrary: addToLibraryEndpoint,
  removeFromLibrary: removeFromLibraryEndpoint,
  updateLibraryStatus: updateLibraryStatusEndpoint,
  addToCollection: addGameToCollectionEndpoint,
  removeFromCollection: removeGameFromCollectionEndpoint,
} = gamesEndpoint;

export async function fetchGames(url: string, params?: ListQueryParams) {
  const response = await _get<PaginatedGamesResponse, ListQueryParams>(url, {
    params,
  });

  return response;
}

export async function fetchGameDetails(gameId: number) {
  const response = await _get<GameDetailResponse>(gameDetailsEndpoint(gameId));

  return response;
}

export async function fetchGameMovies(gameId: number) {
  const response = await _get<PaginatedGameMoviesResponse>(gameMoviesEndpoint(gameId));

  return response;
}

export async function fetchGameRedditPosts(gameId: number) {
  const response = await _get<PaginatedRedditPosts>(gameRedditPostsEndpoint(gameId));

  return response;
}

export async function fetchGameScreenshots(gameId: number) {
  const response = await _get<PaginatedScreenshots>(gameScreenshotsEndpoint(gameId));

  return response;
}

export async function fetchGameCollections(gameId: number) {
  const response = await _get<PaginatedCollectionDetailsResponse>(gameCollectionsEndpoint(gameId));

  return response;
}

export async function requestAddGameToLibrary(body: AddToLibraryBody) {
  const response = await _post<AddToLibraryBody, AddToLibraryResponseError>(
    addToLibraryEndpoint,
    body,
  );

  return response;
}

export async function requestRemoveGameFromLibrary(gameId: number) {
  const response = await _delete(removeFromLibraryEndpoint(gameId));

  return response;
}

export async function requestUpdateGameLibrary(gameId: number, body: UpdateGameLibraryStatus) {
  const response = await _patch<UpdateLibraryResponseSuccess>(
    updateLibraryStatusEndpoint(gameId),
    body,
  );

  return response;
}

export async function requestAddGameToCollection(
  collectionId: number,
  body: AddGameToCollectionBody,
) {
  const response = await _post<
    AddGameToCollectionBody,
    AddGameToCollectionResponseError,
    AddGameToCollectionBody
  >(addGameToCollectionEndpoint(collectionId), body);

  return response;
}

export async function requestRemoveGameFromCollection(collectionId: number, feedId: number) {
  const response = await _delete(removeGameFromCollectionEndpoint(collectionId, feedId));

  return response;
}

const {
  collectionFeed: collectionFeedEndpoint,
  addNewCollection: addNewCollectionEndpoint,
  updateDeleteCollection: updateDeleteCollectionEndpoint,
} = collectionsEndpoint;

export async function fetchCollectionFeed(collectionId: number) {
  const response = await _get<PaginatedCollectionFeedsResponse>(
    collectionFeedEndpoint(collectionId),
  );

  return response;
}

export async function requestAddNewCollection(newCollection: AddNewOrUpdateCollectionBody) {
  const response = await _post<CollectionDetailResponse, AddNewCollectionResponseError>(
    addNewCollectionEndpoint,
    newCollection,
  );

  return response;
}

export async function requestUpdateCollection(
  collectionId: number,
  updatedCollection: Partial<AddNewOrUpdateCollectionBody>,
) {
  const response = await _post<CollectionDetailResponse, AddNewCollectionResponseError>(
    updateDeleteCollectionEndpoint(collectionId),
    updatedCollection,
  );

  return response;
}

export async function requestDeleteCollection(collectionId: number) {
  const response = await _delete(updateDeleteCollectionEndpoint(collectionId));

  return response;
}

const { top30: top30OnLeaderboardEndpoint, topLeaderboardsOfGame: topLeaderboardsOfGameEndpoint } =
  leaderboardsEndpoint;

export async function fetchTopUsersInLeaderboards(params?: ListQueryParams) {
  const response = await _get<PaginatedLeaderboardUsersResponse>(top30OnLeaderboardEndpoint, {
    params,
  });

  return response;
}

export async function fetchTopUsersInLeaderboardOfGame(gameId: number, params?: ListQueryParams) {
  const response = await _get<PaginatedLeaderboardUsersResponse>(
    topLeaderboardsOfGameEndpoint(gameId),
    { params },
  );

  return response;
}

const { list: systemListEndpoint, details: systemDetailsEndpoint } = systemsEndpoint;

export async function fetchSystemPlatforms(params?: ListQueryParams) {
  const response = await _get<PaginatedEntityFiltersResponse>(systemListEndpoint, { params });

  return response;
}

export async function fetchSystemPlatformDetails(platformId: number) {
  const response = await _get<EntityFilterResponse>(systemDetailsEndpoint(platformId));

  return response;
}

const { list: tagListEndpoint, details: tagDetailsEndpoint } = tagsEndpoint;

export async function fetchTags(params?: ListQueryParams) {
  const response = await _get<PaginatedEntityFiltersResponse>(tagListEndpoint, { params });

  return response;
}

export async function fetchTagDetails(tagId: number) {
  const response = await _get<EntityFilterResponse>(tagDetailsEndpoint(tagId));

  return response;
}
