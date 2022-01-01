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
    color: Colors.black,
  },
  signContainer: {},
  signIcon: {
    padding: Metrics.paddingSmallX,
  },
  temp: {
    fontSize: Metrics.fonts.extraL,
    color: Colors.black,
  },
  textContainer: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  text: {},
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  conditionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionIcon: {paddingBottom: Metrics.paddingSmall},
  conditionText: {color: Colors.black},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {color: Colors.black, fontWeight: '600'},
  bold: {fontWeight: 'bold'},
});
