import React, {Component} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigation from './navigation/AppNavigation';

class App extends Component {
  configure = configureStore();

  componentDidMount() {
    LogBox.ignoreLogs([`Deprecation in 'createStackNavigator':`]);
    LogBox.ignoreLogs([`Deprecation in 'navigationOptions':`]);
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
