import axios from 'axios';

import ApiConstants from './apiConstants';

const { BASE_URL, developerKey } = ApiConstants;

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: developerKey,
  },
});

instance.interceptors.request.use((requestConfig) => {
  console.log(requestConfig.method + ' : ' + requestConfig.url);
  return requestConfig;
});

export default instance;
