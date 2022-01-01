import {fork} from 'redux-saga/effects';
import watchWeatherSaga from '../modules/weather/WeatherSaga';

export default function* rootSaga() {
  yield fork(watchWeatherSaga);
}
