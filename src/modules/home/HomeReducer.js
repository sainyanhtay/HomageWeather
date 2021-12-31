import HomeTypes from './HomeTypes';

const INITIAL_STATE = {loading: false, weatherList: null};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeTypes.RETRIVE_WEATHER_REQUEST: {
      return {...state, loading: true};
    }

    case HomeTypes.RETRIVE_WEATHER_SUCCEED: {
      return {...state, loading: false, weatherList: action.payload};
    }
    case HomeTypes.RETRIVE_WEATHER_FAILED: {
      return {...state, loading: false};
    }

    default:
      return state;
  }
};
