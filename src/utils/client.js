import inRange from 'lodash/inRange';

import axios from 'axios';
import { deepCamelCase } from 'utils/lodash';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
axios.defaults.timeout = 1000;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => ({ ...response, data: deepCamelCase(response.data) }),
  error => Promise.reject(error),
);

const client = axios;

export default client;

export const isSuccess = response => inRange(response.status, 200, 299);
