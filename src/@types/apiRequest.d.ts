interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody extends LoginBody {
  username: string;
}

interface AddNewOrUpdateCollectionBody {
  name: string;
  description?: string;
  is_private?: boolean;
}

interface AddGameToCollectionBody {
  games: number[];
}

interface AddGameToFavoriteBody {
  game: number;
  position: number;
}

interface AddToLibraryBody {
  game: number;
  status: LibraryStatus;
}

interface UpdateGameLibraryStatus {
  status: LibraryStatus;
}

interface ListQueryParams {
  discover?: boolean;
  page?: number;
  page_size?: number;
  search?: string;
  search_precise?: boolean;
  search_exact?: boolean;
  platforms?: string;
  genres?: string;
  tags?: string;
  metacritic?: string;
  ordering?: string;
}
