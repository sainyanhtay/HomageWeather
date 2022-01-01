import {call, put, select, takeLatest} from 'redux-saga/effects';
import WeatherTypes from './WeatherTypes';
import weatherServices from './WeatherServices';

function* retrieveWeather(action) {
  try {
    const weatherResponse = yield call(
      weatherServices.retrieveWeatherList,
      action.payload.requestBody,
    );
    yield put({
      type: WeatherTypes.RETRIVE_WEATHER_SUCCEED,
      payload: weatherResponse,
    });
  } catch (e) {
    action.payload.handleResponse(e);
    yield put({type: WeatherTypes.RETRIVE_WEATHER_FAILED, payload: e});
  }
}

function* retrieveWeatherDetail(action) {
  try {
    const weatherDetailResponse = yield call(
      weatherServices.retrieveWeatherDetail,
      action.payload.requestBody,
    );
    yield put({
      type: WeatherTypes.RETRIVE_WEATHER_DETAIL_SUCCEED,
      payload: weatherDetailResponse,
    });
  } catch (e) {
    action.payload.handleResponse(e);
    yield put({type: WeatherTypes.RETRIVE_WEATHER_DETAIL_FAILED, payload: e});
  }
}

export default function* watchWeatherSaga() {
  yield takeLatest(WeatherTypes.RETRIVE_WEATHER_REQUEST, retrieveWeather);
  yield takeLatest(
    WeatherTypes.RETRIVE_WEATHER_DETAIL_REQUEST,
    retrieveWeatherDetail,
  );
}
