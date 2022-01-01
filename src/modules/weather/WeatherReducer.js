import WeatherTypes from './WeatherTypes';

const INITIAL_STATE = {
  loading: false,
  weatherList: [],
  weatherDetail: {},
  loadingDetail: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WeatherTypes.RETRIVE_WEATHER_REQUEST: {
      return {...state, loading: true};
    }

    case WeatherTypes.RETRIVE_WEATHER_SUCCEED: {
      return {...state, loading: false, weatherList: action.payload};
    }
    case WeatherTypes.RETRIVE_WEATHER_FAILED: {
      return {...state, loading: false};
    }

    case WeatherTypes.RETRIVE_WEATHER_DETAIL_REQUEST: {
      return {...state, loadingDetail: true};
    }

    case WeatherTypes.RETRIVE_WEATHER_DETAIL_SUCCEED: {
      return {...state, loadingDetail: false, weatherDetail: action.payload[0]};
    }

    case WeatherTypes.RETRIVE_WEATHER_DETAIL_FAILED: {
      return {...state, loadingDetail: false};
    }

    default:
      return state;
  }
};
