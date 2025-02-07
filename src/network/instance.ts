import axios from 'axios';

import ApiConstants from './apiConstants';

const { BASE_URL, developerKey } = ApiConstants;

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: developerKey,
  },
});

export default instance;
