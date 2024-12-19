interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody extends LoginRequestBody {
  username: string;
}

interface AddNewOrUpdateCollectionRequestBody {
  name: string;
  description?: string;
  is_private?: boolean;
}

interface AddGameToCollectionRequestBody {
  games: number[];
}

interface AddGameToFavoriteRequestBody {
  game: number;
  position: number;
}

interface AddToLibraryRequestBody {
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
