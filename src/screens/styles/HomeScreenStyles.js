import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Metrics} from '../../themes';
import {Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  unitContainer: {
    position: 'absolute',
    bottom: Metrics.marginLargeX4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    borderRadius: Metrics.radiusMedium,
    flexDirection: 'row',
  },
  buttonContainer: {padding: Metrics.paddingMedium},
  separator: {borderRightWidth: 1, borderRightColor: Colors.iconGrey},
});
