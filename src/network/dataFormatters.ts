export function formatGameBackground(
  gameBackgroundResponse: GameBackgroundResponse,
): GameBackground {
  const { dominant_color, saturated_color } = gameBackgroundResponse;

  const gameBackground: GameBackground = {
    ...gameBackgroundResponse,
    dominantColor: dominant_color,
    saturatedColor: saturated_color,
  };

  return gameBackground;
}

export function formatUserDetails(userResponse: UserDetailsResponse): User {
  const { bio_raw, collections_count, full_name, game_background, games_count, following_count } =
    userResponse;

  const user: User = {
    ...userResponse,
    collectionsCount: collections_count,
    followingCount: following_count,
    fullName: full_name,
    gameBackgroundImage: game_background ? formatGameBackground(game_background) : null,
    gamesCount: games_count,
    rawBio: bio_raw,
  };

  return user;
}

export function formatGamePlatform(
  gamePlatformResponse: GameSystemPlatformResponse,
): GameSystemPlatform {
  const { released_at, platform } = gamePlatformResponse;

  const gamePlatform: GameSystemPlatform = {
    ...gamePlatformResponse,
    releasedAt: released_at,
    systemPlatform: platform,
  };

  return gamePlatform;
}

export function formatGameDetail(gameResponse: GameDetailResponse): Game {
  const {
    achievements_count,
    esrb_rating,
    name_original,
    movies_count,
    parent_achievements_count,
    rating_top,
    reddit_url,
    creators_count,
    dominant_color,
    saturated_color,
    background_image,
    background_image_additional,
    description_raw,
    screenshots_count,
    metacritic,
    tba,
    platforms,
  } = gameResponse;

  const game: Game = {
    ...gameResponse,
    achievementsCount: achievements_count,
    ageRating: esrb_rating,
    backgroundImage: background_image,
    backgroundImageAdditional: background_image_additional,
    creatorsCount: creators_count,
    dominantColor: dominant_color,
    metaCritic: metacritic,
    moviesCount: movies_count,
    originalName: name_original,
    parentAchievementsCount: parent_achievements_count,
    ratingTop: rating_top,
    rawDescription: description_raw,
    redditUrl: reddit_url,
    saturatedColor: saturated_color,
    screenshotsCount: screenshots_count,
    toBeAnnounced: tba,
    systemPlatforms: platforms?.map(formatGamePlatform) ?? null,
  };

  return game;
}

export function formatGameMovie(gameMovieResponse: GameMovieResponse): Movie {
  const { data } = gameMovieResponse;

  const movie: Movie = {
    ...gameMovieResponse,
    data: {
      ...data,
      low: data[480],
    },
  };

  return movie;
}

export function formatEntityDetail(systemResponse: EntityDetailsResponse): Entity {
  const { games_count, image_background } = systemResponse;

  const system: Entity = {
    ...systemResponse,
    gamesCount: games_count,
    imageBackground: image_background,
  };

  return system;
}

export function formatAllEntities(
  allSystemsResponse: PaginatedData<EntityDetailsResponse>,
): PaginatedData<Entity> {
  const { results } = allSystemsResponse;

  const result: PaginatedData<Entity> = {
    ...allSystemsResponse,
    results: results.map(formatEntityDetail),
  };

  return result;
}

export function formatCollection(collectionResponse: CollectionDetailResponse): Collection {
  const {
    is_private,
    game_background,
    game_covers,
    games_count,
    likes_count,
    likes_positive,
    likes_rating,
    likes_users,
    posts_count,
    share_image,
    backgrounds,
  } = collectionResponse;

  const collection: Collection = {
    ...collectionResponse,
    gameBackground: game_background ? formatGameBackground(game_background) : null,
    gameCovers: game_covers.map(formatGameBackground),
    gamesCount: games_count,
    isPrivate: is_private,
    likesCount: likes_count,
    likesPositive: likes_positive,
    likesRating: likes_rating,
    likesUsers: likes_users,
    postsCount: posts_count,
    shareImage: share_image,
    backgrounds: backgrounds.map(formatGameBackground),
  };

  return collection;
}

export function formatCollectionFeed(
  collectionFeedResponse: CollectionFeedResponse,
): CollectionFeed {
  const { game } = collectionFeedResponse;

  const collectionFeed: CollectionFeed = {
    ...collectionFeedResponse,
    game: formatGameDetail(game),
  };

  return collectionFeed;
}

export function formatLeaderboard(leaderboardResponse: LeaderboardUserResponse): LeaderboardUser {
  const { user } = leaderboardResponse;

  return {
    ...leaderboardResponse,
    user: formatUserDetails(user),
  };
}

export function formatGameInCollection(
  gameInCollectionResponse: GameInCollectionResponse,
): GameInCollection {
  const { game_in_collection } = gameInCollectionResponse;

  return {
    ...gameInCollectionResponse,
    gameInCollection: game_in_collection,
  };
}
