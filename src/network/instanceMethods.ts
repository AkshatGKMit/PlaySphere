import { AxiosResponse } from 'axios';

import instance from './instance';

async function _get<T, Params = {}>(
  url: string,
  config?: ApiCallConfig<Params>,
): Promise<AxiosResponse<T>> {
  const response = await instance.get<T>(url, config);

  return response;
}

async function _post<T, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): Promise<AxiosResponse<T>> {
  const response = await instance.post(url, data, config);

  return response;
}

async function _put<T, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): Promise<AxiosResponse<T>> {
  const response = await instance.put(url, data, config);

  return response;
}

async function _patch<T, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): Promise<AxiosResponse<T>> {
  const response = await instance.patch(url, data, config);

  return response;
}

async function _delete<T, Body = {}, Params = {}>(
  url: string,
  data: Body,
  config?: ApiCallConfig<Params>,
): Promise<AxiosResponse<T>> {
  const response = await instance.delete(url, { ...config, data });

  return response;
}

export { _get, _delete, _patch, _put, _post };
