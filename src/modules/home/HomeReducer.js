import HomeTypes from './HomeTypes';

const INITIAL_STATE = {loading: false};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeTypes.RETRIVE_WEATHER_REQUEST: {
      return {...state, loading: true};
    }

    case HomeTypes.RETRIVE_WEATHER_SUCCEED:
    case HomeTypes.RETRIVE_WEATHER_FAILED: {
      return {...state, loading: false};
    }

    default:
      return state;
  }
};
