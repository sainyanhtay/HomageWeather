import API from '../../services/API';
import {configs, URI} from '../../constants';

const weatherService = {
  retrieveWeatherList: requestData =>
    API.get(`${URI.retrieveWeather}${configs.API_KEY}`)
      .then(response => response.data)
      .catch(function (error) {
        throw error;
      }),

  retrieveWeatherDetail: requestData =>
    API.get(
      `${URI.retrieveWeatherDetail}${requestData}${configs.API_KEY}&details=true`,
    )
      .then(response => response.data)
      .catch(function (error) {
        throw error;
      }),
};

export default weatherService;
