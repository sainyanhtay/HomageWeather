import HomeTypes from './HomeTypes';

export const retrieveWeather = (requestBody, handleResponse) => {
  return {
    type: HomeTypes.RETRIVE_WEATHER_REQUEST,
    payload: {requestBody, handleResponse},
  };
};
