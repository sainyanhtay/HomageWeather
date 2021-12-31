import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Colors, Images, Metrics} from '../themes';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailHeader = ({title, onLeftPress, onRightPress}) => {
  return (
    <ImageBackground style={styles.header} source={Images.ny} blurRadius={90}>
      <SafeAreaView style={styles.titleContainer}>
        {onLeftPress ? (
          <TouchableOpacity onPress={onLeftPress}>
            <Entypo
              name={'list'}
              size={Metrics.icons.medium}
              color={Colors.textWhite}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {onRightPress ? (
          <TouchableOpacity onPress={onRightPress}>
            <Feather
              name={'search'}
              size={Metrics.icons.medium}
              color={Colors.textWhite}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    height: Metrics.detailBarHeight,
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: Metrics.statusBarHeight,
    paddingHorizontal: Metrics.paddingSmall,
  },
  title: {
    fontSize: Metrics.fonts.title,
    color: Colors.textWhite,
    fontWeight: 'bold',
  },
});

export default DetailHeader;
