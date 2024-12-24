interface GameBackground {
  url: string;
  dominantColor: string;
  saturatedColor: string;
}
type GameBackgrounds = GameBackground[];

interface PaginatedData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * @EntityFilter Can be System Platform, Tag, Genre or rating
 */
interface EntityFilter {
  id: number;
  name: string;
  slug: string;
  gamesCount?: number;
  imageBackground?: string;
  description?: string;
}
type EntityFilters = EntityFilter[];

interface User {
  id: number;
  username: string;
  slug: string;
  fullName: string;
  avatar: string | null;
  gamesCount: number;
  collectionsCount: number;
  bio?: string;
  gameBackgroundImage?: GameBackground | null;
  followingCount?: number;
  rawBio?: string;
}

interface Rating {
  id: number;
  title: RatingCategory;
  count: number;
  percent: number;
}
type Ratings = Rating[];

interface GameSystemPlatform {
  systemPlatform: EntityFilter;
  releasedAt: string;
  requirements: {
    minimum?: string;
    recommended?: string;
  };
}
type GameSystemPlatforms = GameSystemPlatform[];

interface Game {
  id: number;
  slug: string;
  name: string;
  originalName: string;
  description: string;
  metaCritic: number | null;
  released: string | null;
  toBeAnnounced: boolean;
  updated: string | null;
  backgroundImage: string;
  backgroundImageAdditional: string;
  website: string;
  rating: number;
  ratingTop: number;
  ratings: Ratings;
  playtime: number;
  screenshotsCount: number;
  moviesCount: number;
  creatorsCount: number;
  achievementsCount: number;
  parentAchievementsCount: number;
  redditUrl: string;
  saturatedColor: string;
  dominantColor: string;
  systemPlatforms: GameSystemPlatforms | null;
  genres: EntityFilters | null;
  tags: EntityFilters | null;
  ageRating: EntityFilter | null;
  rawDescription: string;
}
type Games = Game[];
type PaginatedGames = PaginatedData<Game>;

interface Movie {
  id: number;
  name: string;
  preview: string;
  data: {
    low: string;
    max: string;
  };
}
type Movies = Movie[];
type PaginatedMovies = PaginatedData<Movie>;

interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}
type Screenshots = Screenshot[];
type PaginatedScreenshots = PaginatedData<Screenshot>;

interface RedditPost {
  id: number;
  name: string;
  text: string;
  image: string | null;
  created: string;
}
type RedditPosts = RedditPost[];
type PaginatedRedditPosts = PaginatedData<RedditPost>;

interface Entity {
  id: number;
  name: string;
  slug: string;
  gamesCount: number;
  imageBackground: string;
  description: string;
  image?: string | null;
  entityGames?: PaginatedData<Game>;
}
type Entities = Entity[];

interface Collection {
  id: number;
  slug: string;
  name: string;
  description: string;
  creator: UserDetailsResponse;
  created: string;
  updated: string | null;
  gameBackground: GameBackground | null;
  backgrounds: GameBackgrounds;
  gamesCount: number;
  postsCount: number;
  likesCount: number;
  likesUsers: number;
  likesPositive: number;
  likesRating: number;
  shareImage: string;
  isPrivate: boolean;
  gameCovers: GameBackgrounds;
}

interface CollectionFeed {
  id: number;
  created: string;
  text: string;
  game: Game;
  user: UserDetailsResponse | null;
}
type CollectionFeeds = CollectionFeed[];

interface GameStatusStats {
  status: string;
  count: number;
  percent: number;
}
type GameStatusesStats = GameStatusStats[];

interface Graph {
  week: number;
  count: number;
}
type Graphs = Graph[];

interface RatingStats {
  id: number;
  title: string;
  count: number;
  percent: number;
}
type RatingsStats = RatingStat[];

interface CollectionStats {
  id: number;
  name: string;
  slug: string;
  count: number;
}
type CollectionsStats = CollectionStats[];

interface GenreStats {
  count: number;
  percent: number;
  genre: EntityFilter;
}
type GenresStats = GenreStats[];

interface UserStats {
  games: {
    count: number;
    statuses: GameStatusesStats;
    graph: Graphs;
  };
  reviews: {
    count: 0;
    ratings: RatingsStats;
    graph: Graphs;
  };
  collections: {
    count: 3;
    items: CollectionsStats;
    graph: Graphs;
  };
  genres: {
    total: 3;
    count: 3;
    results: GenresStats;
  };
}

interface UserGameLibrary extends PaginatedData<Movie> {
  counters: {
    owned: number;
    playing: number;
    toplay: number;
    beaten: number;
    dropped: number;
    yet: number;
    uncategorized: number;
  };
}

interface LeaderboardUser {
  user: User;
}

interface GameInCollection {
  id: number;
  slug: string;
  name: string;
  gameInCollection: boolean;
}

type Collections = Collection[];
type GameInCollections = GameInCollection[];
type LeaderboardUsers = LeaderboardUser[];
type PaginatedLeaderboardUsers = PaginatedData<LeaderboardUser>;
