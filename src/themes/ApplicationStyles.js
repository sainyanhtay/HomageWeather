import {Dimensions, Platform} from 'react-native';
import Metrics from './Metrics';
import Colors from './Colors';

let {width, height} = Dimensions.get('window');
const ApplicationStyles = {
  screen: {
    container: {
      flex: 1,
      width: width,
      height: height,
      backgroundColor: Colors.transparent,
    },

    allCenter: {justifyContent: 'center', alignItems: 'center'},

    loading: {flex: 1, justifyContent: 'center', alignSelf: 'center'},

    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
    },

    elevationCardStyle: {
      borderWidth: 1,
      borderColor: Colors.whiteTransparent,
      //need to remove bgColor
      backgroundColor: Colors.elevationBg,
      ...Platform.select({
        ios: {
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        },
        android: {elevation: 5},
      }),
    },
  },
};

export default ApplicationStyles;
