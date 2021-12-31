import {fork} from 'redux-saga/effects';
import watchHomeSaga from '../modules/home/HomeSaga';

export default function* rootSaga() {
  yield fork(watchHomeSaga);
}
