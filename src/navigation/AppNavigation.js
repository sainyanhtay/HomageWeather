import * as React from 'react';
import {Scene, Router, Lightbox} from 'react-native-router-flux';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

function AppNavigation() {
  return (
    <Router>
      <Lightbox>
        <Scene key="root" hideNavBar initial>
          <Scene key="mainScreens" type="replace" hideNavBar>
            <Scene key="home" component={HomeScreen} />
            <Scene key="detail" component={DetailScreen} />
          </Scene>
        </Scene>
      </Lightbox>
    </Router>
  );
}

export default AppNavigation;
