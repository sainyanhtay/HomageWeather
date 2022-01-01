import {combineReducers} from 'redux';
import weather from '../modules/weather/WeatherReducer';

export default combineReducers({
  weather,
});
