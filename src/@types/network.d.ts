import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

declare global {
  interface ApiSuccessResponse<T> {
    success: true;
    result: AxiosResponse<T>;
  }

  interface ApiErrorResponse<T> {
    success: false;
    error: AxiosError<T>;
  }

  type ApiResponse<Success, Error> = Promise<ApiSuccessResponse<Success> | ApiErrorResponse<Error>>;

  type ApiCallError = { code: number | string; message: string };

  interface ApiCallConfig<Params = {}> extends AxiosRequestConfig {
    params?: Params;
  }
}
