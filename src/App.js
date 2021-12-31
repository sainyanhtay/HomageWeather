import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigation from './navigation/AppNavigation';
// import SplashScreen from 'react-native-splash-screen';

class App extends Component {
  configure = configureStore();

  componentDidMount() {
    // SplashScreen.hide();
  }

  render() {
    const {persistor, store} = this.configure;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
