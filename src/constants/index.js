import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const URI = {
  baseURL: 'https://dataservice.accuweather.com',
  retrieveWeather: '/currentconditions/v1/topcities/150',
};

export const STORAGE = {
  apiKey: 'API_KEY',
  devMode: 'DEV_MODE',
  baseUrl: 'BASE_URL',
};

export const configs = {
  width,
  height,
  TOKEN_TYPE: {
    BASIC: 'Basic',
    BEARER: 'Bearer',
  },
  API_KEY: '?apikey=XSJyzs5cKmXJ5302pxe3vWlFIhRHjN98',
};
