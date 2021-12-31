import * as React from 'react';
import {Scene, Router, Lightbox} from 'react-native-router-flux';
import HomeScreen from '../screens/HomeScreen';

function AppNavigation() {
  return (
    <Router>
      <Lightbox>
        <Scene key="root" hideNavBar initial>
          <Scene key="mainScreens" type="replace" hideNavBar>
            <Scene key="home" component={HomeScreen} />
          </Scene>
        </Scene>
      </Lightbox>
    </Router>
  );
}

export default AppNavigation;
