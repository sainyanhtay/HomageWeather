import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors, Metrics} from '../themes';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const SearchHeader = ({onChangeText, searchText, clearSearch}) => {
  return (
    <View style={styles.header}>
      <Feather
        name={'search'}
        size={Metrics.icons.small}
        color={Colors.black}
        style={{alignSelf: 'center'}}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={searchText}
        placeholder="Search"
        autoFocus
      />
      <TouchableOpacity onPress={clearSearch} style={{alignSelf: 'center'}}>
        <Entypo
          name={'circle-with-cross'}
          size={Metrics.icons.small}
          color={Colors.iconDarkGray}
        />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
    height: Metrics.headerBarHeight,
    paddingHorizontal: Metrics.paddingSmall,
  },
  input: {
    flex: 1,
    marginHorizontal: Metrics.paddingSmall,
  },
});

export default SearchHeader;
