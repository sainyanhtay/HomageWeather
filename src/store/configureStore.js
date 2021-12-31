import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import root from '../sagas';
import logger from './logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();
let store = null;

const persistConfig = {
  key: 'AYACenter_Care',
  storage: AsyncStorage,
  blacklist: [''],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default function configureStore() {
  if (!store) {
    const middlewares = [];

    middlewares.push(sagaMiddleware);
    if (__DEV__) {
      middlewares.push(logger);
    }

    store = createStore(persistedReducer, applyMiddleware(...middlewares));

    sagaMiddleware.run(root);
  }

  let persistor = persistStore(store);

  return {store, persistor};
}
