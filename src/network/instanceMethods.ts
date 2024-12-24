import { AxiosResponse } from 'axios';

import instance from './instance';

async function _get<T, Params = {}>(url: string, config?: ApiCallConfig<Params>) {
  const response = instance.get<T>(url, config);

  return response;
}

async function _post<Success, Error, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): ApiResponse<Success, Error> {
  try {
    const result = await instance.post<Success>(url, data, config);

    return { success: true, result };
  } catch (error: any) {
    throw error as AxiosResponse<Error>;
  }
}

async function _patch<T, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
) {
  const response = instance.patch<T>(url, data, config);

  return response;
}

async function _delete<Success, Error, Body = {}, Params = {}>(
  url: string,
  data?: Body,
  config?: ApiCallConfig<Params>,
): ApiResponse<Success, Error> {
  try {
    const result = await instance.delete<Success>(url, { ...config, data });

    return { success: true, result };
  } catch (error: any) {
    return { success: false, error };
  }
}

export { _get, _delete, _patch, _post };
