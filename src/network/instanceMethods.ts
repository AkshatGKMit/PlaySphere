import { AxiosResponse } from 'axios';

import instance from './instance';

async function _get<T, Params = {}>(url: string, config?: ApiCallConfig<Params>) {
  const response = await instance.get<T>(url, config);

  return response.data;
}

async function _post<Success, Error, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): ApiResponse<Success, Error> {
  try {
    const response = await instance.post<Success>(url, data, config);

    return { success: true, result: response.data };
  } catch (error: any) {
    throw error as AxiosResponse<Error>;
  }
}

async function _patch<Success, Error, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): ApiResponse<Success, Error> {
  try {
    const response = await instance.patch<Success>(url, data, config);

    return { success: true, result: response.data };
  } catch (error) {
    throw error as AxiosResponse<Error>;
  }
}

async function _delete<Success, Error, Body = {}, Params = {}>(
  url: string,
  data?: Body,
  config?: ApiCallConfig<Params>,
): ApiResponse<Success, Error> {
  try {
    const response = await instance.delete<Success>(url, { ...config, data });

    return { success: true, result: response.data };
  } catch (error: any) {
    return { success: false, error };
  }
}

export { _get, _delete, _patch, _post };
