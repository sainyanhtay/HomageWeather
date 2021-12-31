import axios from 'axios';
import {URI} from '../constants';

const API = axios.create({
  timeout: 50000,
  headers: {},
});

API.interceptors.request.use(
  async function (request) {
    request.url = URI.baseURL + request.url;
    request.headers = {
      client: 'mobile',
    };
    console.log('check request', request);
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    console.log('check error', error);
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      return Promise.reject(error);
    } else {
      console.log('Error', error.message);
    }
  },
);

export default API;
