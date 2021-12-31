import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, ApplicationStyles, Metrics} from '../themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const weatherIcon = (shadowColor, IconType, iconName) => (
  <View
    style={[styles.elevationCardStyle, styles.signContainer, {shadowColor}]}>
    <IconType
      name={iconName}
      size={Metrics.icons.large}
      color={shadowColor}
      style={[styles.signIcon]}
    />
  </View>
);
const renderWeatherSign = item => {
  if (
    item.WeatherText.toLowerCase().includes('cloud') &&
    item.WeatherText.toLowerCase().includes('sun')
  )
    return weatherIcon(
      Colors.iconGrey,
      MaterialCommunityIcons,
      'weather-partly-cloudy',
    );
  else if (item.WeatherText.toLowerCase().includes('cloud'))
    return weatherIcon(Colors.blue, AntDesign, 'cloudo');
  else if (
    item.WeatherText.toLowerCase().includes('clear') ||
    item.WeatherText.toLowerCase().includes('sun')
  )
    return weatherIcon(Colors.sun, MaterialCommunityIcons, 'weather-sunny');
  else if (item.WeatherText.toLowerCase().includes('rain'))
    return weatherIcon(
      Colors.secondaryColor,
      MaterialCommunityIcons,
      'weather-pouring',
    );
  else if (item.WeatherText.toLowerCase().includes('snow'))
    return weatherIcon(
      Colors.secondaryColor,
      MaterialCommunityIcons,
      'weather-snowy-heavy',
    );
  else if (item.WeatherText.toLowerCase().includes('thunderstorm'))
    return weatherIcon(
      Colors.black,
      MaterialCommunityIcons,
      'weather-lightning-rainy',
    );
  else if (item.WeatherText.toLowerCase().includes('wind'))
    return weatherIcon(
      Colors.iconGrey,
      MaterialCommunityIcons,
      'weather-windy',
    );
  else if (item.WeatherText.toLowerCase().includes('overcast'))
    return weatherIcon(
      Colors.iconDarkGray,
      MaterialCommunityIcons,
      'weather-sunset-down',
    );
};

const City = ({item, isCelsius, onPressDetail}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPressDetail(item)}>
      <Text style={styles.temp}>{`${
        isCelsius
          ? item.Temperature.Metric.Value.toFixed()
          : item.Temperature.Imperial.Value.toFixed()
      }\u00B0`}</Text>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {`${item.EnglishName}, ${item.Country.EnglishName}`}
        </Text>
        <Text>{item.WeatherText}</Text>
      </View>
      {renderWeatherSign(item)}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
    padding: Metrics.paddingMediumXX,
    alignItems: 'center',
  },
  temp: {fontSize: Metrics.fonts.large, flex: 0.3},
  nameContainer: {paddingHorizontal: Metrics.paddingMedium, flex: 0.5},
  name: {fontWeight: 'bold'},
  signContainer: {flex: 0.2, borderRadius: Metrics.radiumLarge},
  signIcon: {
    alignSelf: 'center',
    padding: Metrics.paddingSmallX,
  },
});

export default City;
