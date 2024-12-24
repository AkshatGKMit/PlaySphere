import { AxiosError, AxiosResponse } from 'axios';
import { InfiniteData, UseMutateFunction } from '@tanstack/react-query';

declare global {
  interface AuthQueryConfig {
    isLogin: boolean;
  }

  interface UseAuthQuery {
    mutate: UseMutateFunction<
      ApiSuccessResponse<AuthSuccessResponse> | ApiErrorResponse<AuthErrorResponse>,
      AxiosError<AuthErrorResponse>,
      RegisterBody
    >;
    error: AxiosError<AuthErrorResponse> | null;
    loading: boolean;
  }

  interface UseInfiniteQueryConfigProps<T> {
    enabled?: boolean;
    onSuccess?: (data: InfiniteData<AxiosResponse<T>>) => void;
    onError?: (error: Error) => void;
    refetchInterval?: number;
    refetchIntervalInBackground?: boolean;
    staleTime?: number;
  }

  interface AddOrRemoveFromCollectionVariables {
    collectionId: number;
    gameId: number;
    isAdding: boolean;
  }

  interface RemoveGameFromCollectionVariables {
    collectionId: number;
    feedId: number;
    gameId: number;
  }

  type AuthQueryKey = [type: string, data: RegisterBody];
  type GameQueryKey = [type: string, url: string, params?: ListQueryParams];
  type GameQueryConfig = UseInfiniteQueryConfigProps<PaginatedGamesResponse>;
}
