interface AuthSuccessResponse {
  key: string;
}

interface AuthErrorResponse {
  username?: string[];
  email?: string[];
  password?: string[];
  non_field_errors: string[];
}

interface GameBackgroundResponse {
  url: string;
  dominant_color: string;
  saturated_color: string;
}
type GameBackgroundsResponse = GameBackgroundResponse[];

interface UserDetailsResponse {
  id: number;
  username: string;
  slug: string;
  full_name: string;
  avatar: string | null;
  games_count: number;
  collections_count: number;
  bio?: string;
  games_wishlist_count?: number;
  game_background?: GameBackgroundResponse | null;
  following_count?: number;
  share_image?: string;
  rated_games_percent?: number;
  noindex?: boolean;
  bio_raw?: string;
}

/**
 * @Entity Can be System Platform, Tag, Genre or Rating
 */
interface EntityFilterResponse {
  id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
  description?: string;
}
type EntityFiltersResponse = EntityFilterResponse[];
type PaginatedEntityFiltersResponse = PaginatedData<EntityFilterResponse>;

interface EntityDetailsResponse {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description: string;
  image?: string | null;
  year_start?: number | null;
  year_end?: number | null;
}
type AllEntityResponse = PaginatedData<EntityDetailsResponse>;

interface GameSystemPlatformResponse {
  platform: EntityFilterResponse;
  released_at: string;
  requirements: {
    minimum?: string;
    recommended?: string;
  };
}
type GameSystemPlatformsResponse = GameSystemPlatformResponse[];

interface GameDetailResponse {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: {
    metascore: number;
    url: string;
    platform: {
      platform: 4;
      name: string;
      slug: string;
    };
  }[];
  released: string;
  tba: boolean;
  updated: string | null;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  platforms: GameSystemPlatformsResponse;
  genres: EntityFiltersResponse;
  tags: EntityFiltersResponse;
  esrb_rating: EntityFilterResponse;
  clip: null;
  description_raw: string;
}
type GameDetailsResponse = GameDetailResponse[];
type PaginatedGamesResponse = PaginatedData<GameDetailResponse>;

interface GameMovieResponse {
  id: number;
  name: string;
  preview: string;
  data: {
    '480': string;
    max: string;
  };
}
type GameMoviesResponse = GameMovieResponse[];
type PaginatedGameMoviesResponse = PaginatedData<GameMovieResponse>;

interface CollectionDetailResponse {
  id: number;
  slug: string;
  name: string;
  description: string;
  creator: UserDetailsResponse;
  created: string;
  updated: string | null;
  game_background: GameBackgroundResponse | null;
  backgrounds: GameBackgroundsResponse;
  games_count: number;
  posts_count: number;
  likes_count: number;
  likes_users: number;
  likes_positive: number;
  likes_rating: number;
  share_image: string;
  is_private: boolean;
  game_covers: GameBackgroundsResponse;
}
type CollectionDetailsResponse = CollectionDetailResponse[];
type PaginatedCollectionDetailsResponse = PaginatedData<CollectionDetailResponse>;

interface CollectionFeedResponse {
  id: number;
  created: string;
  text: string;
  text_preview: string;
  text_previews: string[];
  text_attachments: number;
  type: string;
  game: GameDetailResponse;
  user: UserDetailsResponse | null;
}
type CollectionFeedsResponse = CollectionFeedResponse[];
type PaginatedCollectionFeedsResponse = PaginatedData<CollectionFeedResponse>;

interface AddGameToFavoriteErrorResponse {
  game: string[];
  position: string[];
}

interface DetailErrorResponse {
  detail: string;
}

interface UserGenreStatResponse {
  count: number;
  percent: number;
  genre: EntityFilterResponse;
}
type UserGenreStatsResponse = UserGenreStatResponse[];

interface UserGenreResponse {
  count: number;
  results: UserGenreStatsResponse;
}

interface AddToLibraryResponseError {
  game: string[];
  status: string[];
}

interface UpdateLibraryResponseSuccess {
  game: number;
  status: string;
}

interface UpdateLibraryResponseError {
  status: string[];
}

interface AddGameToCollectionResponseError {
  games: string[];
}

interface AddNewCollectionResponseError {
  name: string[];
  description: string[];
  is_private: string[];
}

interface LeaderboardUserResponse {
  user: UserDetailsResponse;
}
type LeaderboardUsersResponse = LeaderboardUserResponse[];
type PaginatedLeaderboardUsersResponse = PaginatedData<LeaderboardUserResponse>;
