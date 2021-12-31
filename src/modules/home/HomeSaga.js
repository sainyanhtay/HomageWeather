import {call, put, select, takeLatest} from 'redux-saga/effects';
import HomeTypes from './HomeTypes';
import homeServices from './HomeServices';

function* retrieveWeather(action) {
  try {
    const weatherResponse = yield call(
      homeServices.retrieveWeatherList,
      action.payload.requestBody,
    );
    yield put({
      type: HomeTypes.RETRIVE_WEATHER_SUCCEED,
      payload: weatherResponse,
    });
  } catch (e) {
    action.payload.handleResponse(e);
    yield put({type: HomeTypes.RETRIVE_WEATHER_FAILED, payload: e});
  }
}

export default function* watchHomeSaga() {
  yield takeLatest(HomeTypes.RETRIVE_WEATHER_REQUEST, retrieveWeather);
}
