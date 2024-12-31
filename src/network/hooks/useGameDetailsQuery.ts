import { useMemo } from 'react';
import { QueryKey, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@constants';
import { fetchGameDetails, fetchGameMovies, fetchGameScreenshots } from '@network/apiEndpointCalls';
import { formatGameDetail, formatGameMovie } from '@network/dataFormatters';

const {
  gameDetails: gameDetailsKey,
  gameScreenshots: gameScreenshotsKey,
  gameMovies: gameMoviesKey,
} = QueryKeys;

const useGameDetailsQuery = (gameId: number) => {
  const { data: gameResponse, isPending: gameLoading } = useQuery<
    GameDetailResponse,
    Error,
    GameDetailResponse,
    QueryKey
  >({
    queryKey: [gameDetailsKey, gameId],
    queryFn: () => fetchGameDetails(gameId),
    staleTime: Infinity,
  });

  const { data: screenshotResponse, isPending: screenshotLoading } = useQuery<
    PaginatedScreenshots,
    Error,
    PaginatedScreenshots,
    QueryKey
  >({
    queryKey: [gameScreenshotsKey, gameId],
    queryFn: () => fetchGameScreenshots(gameId),
    staleTime: Infinity,
  });

  const { data: moviesResponse, isPending: moviesLoading } = useQuery<
    PaginatedGameMoviesResponse,
    Error,
    PaginatedGameMoviesResponse,
    QueryKey
  >({
    queryKey: [gameMoviesKey, gameId],
    queryFn: () => fetchGameMovies(gameId),
    staleTime: Infinity,
  });

  const game: Game | undefined = useMemo(() => {
    if (!gameResponse) {
      return undefined;
    }

    return formatGameDetail(gameResponse);
  }, [gameResponse]);

  const screenshots: Screenshots | undefined = useMemo(
    () => screenshotResponse?.results,
    [screenshotResponse?.results],
  );

  const movies: Movies | undefined = useMemo(() => {
    if (!moviesResponse) {
      return undefined;
    }

    return moviesResponse.results.map(formatGameMovie);
  }, [moviesResponse]);

  return { game, gameLoading, screenshots, screenshotLoading, movies, moviesLoading };
};

export default useGameDetailsQuery;
