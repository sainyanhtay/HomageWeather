import API from '../../services/API';
import {configs, URI} from '../../constants';

const homeService = {
  retrieveWeatherList: requestData =>
    API.get(`${URI.retrieveWeather}${requestData}${configs.API_KEY}`)
      .then(response => response.data)
      .catch(function (error) {
        throw error;
      }),
};

export default homeService;
