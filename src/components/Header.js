import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../themes';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const Header = ({title, onLeftPress, onRightPress}) => {
  return (
    <View style={styles.header}>
      {onLeftPress ? (
        <TouchableOpacity>
          <Entypo
            name={'list'}
            size={Metrics.icons.medium}
            color={Colors.black}
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
            color={Colors.black}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    height: Metrics.headerBarHeight,
    paddingHorizontal: Metrics.paddingSmall,
  },
  title: {
    fontSize: Metrics.fonts.title,
    fontWeight: 'bold',
  },
});

export default Header;
