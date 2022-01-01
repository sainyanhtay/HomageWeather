import WeatherTypes from './WeatherTypes';

export const retrieveWeather = (requestBody, handleResponse) => {
  return {
    type: WeatherTypes.RETRIVE_WEATHER_REQUEST,
    payload: {requestBody, handleResponse},
  };
};

export const retrieveWeatherDetail = (requestBody, handleResponse) => {
  return {
    type: WeatherTypes.RETRIVE_WEATHER_DETAIL_REQUEST,
    payload: {requestBody, handleResponse},
  };
};
