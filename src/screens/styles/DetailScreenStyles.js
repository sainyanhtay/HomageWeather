import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Metrics} from '../../themes';
import {Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  image: {
    width: Metrics.images.largeXL,
    height: Metrics.images.largeXL,
    borderRadius: Metrics.radiumFull,
  },
  imageContainer: {
    marginTop: -Metrics.images.largeXL / 2,
    alignSelf: 'center',
    borderRadius: Metrics.radiumFull,
  },
  name: {
    alignSelf: 'center',
    paddingVertical: Metrics.paddingMedium,
    fontWeight: '500',
  },
});
