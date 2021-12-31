import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const URI = {
  baseURL: 'https://api.openweathermap.org/data/2.5',
  retrieveWeather: '/box/city?bbox=',
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
  API_KEY: '&APPID=11c8936d08951343552afc526a9a3112',
};
