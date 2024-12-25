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

const {
  current: currentUserEndpoint,
  overview: userOverviewEndpoint,
  addToFavorites: addToFavoritesEndpoint,
  removeFromFavorites: removeFromFavoritesEndpoint,
  statistics: userStatsEndpoint,
  genres: userGenreEndpoint,
  myCollections: userCollectionsEndpoint,
  gameInCollection: gameInCollectionEndpoint,
} = userEndpoints;

const {
  details: gameDetailsEndpoint,
  movies: gameMoviesEndpoint,
  reddit: gameRedditPostsEndpoint,
  screenshots: gameScreenshotsEndpoint,
  collections: gameCollectionsEndpoint,
  addToLibrary: addToLibraryEndpoint,
  removeFromLibrary: removeFromLibraryEndpoint,
  updateLibraryStatus: updateLibraryStatusEndpoint,
  addOrRemoveFromCollection: addOrRemoveGameFromCollectionEndpoint,
  removeFromCollection: removeGameFromCollectionEndpoint,
} = gamesEndpoint;

const {
  collectionFeed: collectionFeedEndpoint,
  addNewCollection: addNewCollectionEndpoint,
  updateDeleteCollection: updateDeleteCollectionEndpoint,
} = collectionsEndpoint;

const { top30: top30OnLeaderboardEndpoint, topLeaderboardsOfGame: topLeaderboardsOfGameEndpoint } =
  leaderboardsEndpoint;

const { list: systemListEndpoint, details: systemDetailsEndpoint } = systemsEndpoint;

// #region - Authentication Calls
export async function requestLogin(loginData: LoginBody) {
  return await _post<AuthSuccessResponse, AuthErrorResponse, LoginBody>(loginEndpoint, loginData);
}

export async function requestSignUp(signUpData: RegisterBody) {
  return await _post<AuthSuccessResponse, AuthErrorResponse, RegisterBody>(
    registerEndpoint,
    signUpData,
  );
}
// #endregion

// #region - User Calls
export async function fetchCurrentUser() {
  return await _get<UserDetailsResponse>(currentUserEndpoint);
}

export async function fetchUserOverview(userId: number) {
  return await _get<UserDetailsResponse>(userOverviewEndpoint(userId));
}

export async function fetchUserStats(userId: number) {
  return await _get<UserStats>(userStatsEndpoint(userId));
}

export async function fetchUserGenre(userId: number, params?: ListQueryParams) {
  return await _get<UserGenreResponse>(userGenreEndpoint(userId), {
    params,
  });
}

export async function fetchUserCollections(userId: number, params?: ListQueryParams) {
  return await _get<PaginatedCollectionDetailsResponse>(userCollectionsEndpoint(userId), {
    params,
  });
}

export async function fetchGameInCollection(gameId: number) {
  return await _get<GameInCollectionsResponse>(gameInCollectionEndpoint(gameId));
}

export async function requestAddToFavorites(requestBody: AddGameToFavoriteBody) {
  return await _post<AddGameToFavoriteBody, AddGameToFavoriteBody>(
    addToFavoritesEndpoint,
    requestBody,
  );
}

export async function requestRemoveFavorites(position: number) {
  return await _delete<{}, DetailErrorResponse>(removeFromFavoritesEndpoint(position));
}
// #endregion

// #region - Games Calls
export async function fetchGames(url: string, params?: ListQueryParams) {
  return await _get<PaginatedGamesResponse, ListQueryParams>(url, {
    params,
  });
}

export async function fetchGameDetails(gameId: number) {
  return await _get<GameDetailResponse>(gameDetailsEndpoint(gameId));
}

export async function fetchGameMovies(gameId: number) {
  return await _get<PaginatedGameMoviesResponse>(gameMoviesEndpoint(gameId));
}

export async function fetchGameRedditPosts(gameId: number) {
  return await _get<PaginatedRedditPosts>(gameRedditPostsEndpoint(gameId));
}

export async function fetchGameScreenshots(gameId: number) {
  return await _get<PaginatedScreenshots>(gameScreenshotsEndpoint(gameId));
}

export async function fetchGameCollections(gameId: number) {
  return await _get<PaginatedCollectionDetailsResponse>(gameCollectionsEndpoint(gameId));
}

export async function requestAddGameToLibrary(body: AddToLibraryBody) {
  return await _post<AddToLibraryBody, AddToLibraryResponseError>(addToLibraryEndpoint, body);
}

export async function requestRemoveGameFromLibrary(gameId: number) {
  return await _delete(removeFromLibraryEndpoint(gameId));
}

export async function requestUpdateGameLibrary(gameId: number, body: UpdateGameLibraryStatus) {
  return await _patch<UpdateLibraryResponseSuccess>(updateLibraryStatusEndpoint(gameId), body);
}

export async function requestAddGameToCollection(
  collectionId: number,
  body: AddOrRemoveGameFromCollectionBody,
) {
  return await _post<AddOrRemoveGameFromCollectionBody, AddOrRemoveGameFromCollectionResponseError>(
    addOrRemoveGameFromCollectionEndpoint(collectionId),
    body,
  );
}

export async function requestRemoveGameFromCollection(
  collectionId: number,
  body: AddOrRemoveGameFromCollectionBody,
) {
  return await _delete<
    AddOrRemoveGameFromCollectionBody,
    AddOrRemoveGameFromCollectionResponseError
  >(addOrRemoveGameFromCollectionEndpoint(collectionId), body);
}

export async function requestRemoveGameFromCollectionFeed(collectionId: number, feedId: number) {
  return await _delete(removeGameFromCollectionEndpoint(collectionId, feedId));
}
// #endregion

// #region - Collection Calls
export async function fetchCollectionFeed(collectionId: number, params?: ListQueryParams) {
  return await _get<PaginatedCollectionFeedsResponse>(collectionFeedEndpoint(collectionId), {
    params,
  });
}

export async function requestAddNewCollection(newCollection: AddNewOrUpdateCollectionBody) {
  return await _post<CollectionDetailResponse, AddNewCollectionResponseError>(
    addNewCollectionEndpoint,
    newCollection,
  );
}

export async function requestUpdateCollection(
  collectionId: number,
  updatedCollection: Partial<AddNewOrUpdateCollectionBody>,
) {
  return await _post<CollectionDetailResponse, AddNewCollectionResponseError>(
    updateDeleteCollectionEndpoint(collectionId),
    updatedCollection,
  );
}

export async function requestDeleteCollection(collectionId: number) {
  return await _delete(updateDeleteCollectionEndpoint(collectionId));
}
// #endregion

// #region - Leaderboard Calls
export async function fetchTopUsersInLeaderboards(params?: ListQueryParams) {
  return await _get<PaginatedLeaderboardUsersResponse>(top30OnLeaderboardEndpoint, {
    params,
  });
}

export async function fetchTopUsersInLeaderboardOfGame(gameId: number, params?: ListQueryParams) {
  return await _get<PaginatedLeaderboardUsersResponse>(topLeaderboardsOfGameEndpoint(gameId), {
    params,
  });
}
//#endregion

// #region  - System Platform Calls
export async function fetchSystemPlatforms(params?: ListQueryParams) {
  return await _get<PaginatedEntityFiltersResponse>(systemListEndpoint, { params });
}

export async function fetchSystemPlatformDetails(platformId: number) {
  return await _get<EntityFilterResponse>(systemDetailsEndpoint(platformId));
}

const { list: tagListEndpoint, details: tagDetailsEndpoint } = tagsEndpoint;

export async function fetchTags(params?: ListQueryParams) {
  return await _get<PaginatedEntityFiltersResponse>(tagListEndpoint, { params });
}

export async function fetchTagDetails(tagId: number) {
  return await _get<EntityFilterResponse>(tagDetailsEndpoint(tagId));
}
// #endregion
