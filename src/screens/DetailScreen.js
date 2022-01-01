import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Image, FlatList} from 'react-native';
import styles from './styles/DetailScreenStyles';
import {connect} from 'react-redux';
import {retrieveWeatherDetail} from '../modules/weather/WeatherActions';
import DetailHeader from '../components/DetailHeader';
import {Actions} from 'react-native-router-flux';
import {Colors, Images, Metrics} from '../themes';
import Carousel from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsg: '',
      isCelsius: false,
      selectedCity: props.SELECTED_CITY,
      horizontalList: [{}, {}],
    };
    console.log('selected in detail ', props.SELECTED_CITY);
  }

  componentDidMount() {
    this.props.retrieveWeatherDetail(this.props.SELECTED_CITY.Key);
  }

  leftPressHeader = () => Actions.pop();

  renderList = ({item, index}) => {
    return (
      <View style={styles.rowContainer}>
        {this.weatherIcon(MaterialCommunityIcons, 'weather-partly-cloudy')}
        <Text style={styles.rowTitle}>{item[0]}</Text>
        <View>
          <Text
            style={
              styles.bold
            }>{`${item[1].Maximum.Imperial.Value.toFixed()}\u00B0 F`}</Text>
          <Text>{`${item[1].Minimum.Imperial.Value.toFixed()}\u00B0 F`}</Text>
        </View>
      </View>
    );
  };

  _renderHorizontal = ({item, index}) => {
    const {SELECTED_CITY, weatherDetail} = this.props;
    // render lists
    if (index == 1) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={Object.entries(weatherDetail?.TemperatureSummary)}
            renderItem={this.renderList}
          />
        </View>
      );
    }
    // render the info
    else
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          {this.renderWeatherSign(SELECTED_CITY.WeatherText)}
          <Text
            style={
              styles.temp
            }>{`${SELECTED_CITY.Temperature.Imperial.Value.toFixed()}\u00B0F`}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{SELECTED_CITY.WeatherText}</Text>
            <Text>
              <Text
                style={
                  styles.bold
                }>{`${SELECTED_CITY.Temperature.Imperial.Value.toFixed()}\u00B0`}</Text>
              {` ${SELECTED_CITY.Temperature.Metric.Value.toFixed()}\u00B0`}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.conditionsContainer}>
              {this.renderConditionIcon('umbrella-outline')}
              <Text style={styles.conditionText}>
                {weatherDetail.CloudCover} %
              </Text>
            </View>
            <View style={styles.conditionsContainer}>
              {this.renderConditionIcon('water-outline')}
              <Text style={styles.conditionText}>
                {weatherDetail.RelativeHumidity} %
              </Text>
            </View>
            <View style={styles.conditionsContainer}>
              {this.renderConditionIcon('weather-windy-variant')}
              <Text style={styles.conditionText}>
                {weatherDetail.Wind.Speed.Imperial.Value}{' '}
                {weatherDetail.Wind.Speed.Imperial.Unit}
              </Text>
            </View>
          </View>
        </View>
      );
  };

  renderConditionIcon = iconName => (
    <MaterialCommunityIcons
      name={iconName}
      size={Metrics.icons.medium}
      color={Colors.iconDarkGray}
      style={styles.conditionIcon}
    />
  );

  weatherIcon = (IconType, iconName) => (
    <View style={styles.signContainer}>
      <IconType
        name={iconName}
        size={Metrics.icons.xxl}
        color={Colors.iconDarkGray}
        style={[styles.signIcon]}
      />
    </View>
  );

  renderWeatherSign = weather => {
    if (
      weather.toLowerCase().includes('cloud') &&
      weather.toLowerCase().includes('sun')
    )
      return this.weatherIcon(MaterialCommunityIcons, 'weather-partly-cloudy');
    else if (weather.toLowerCase().includes('cloud'))
      return this.weatherIcon(AntDesign, 'cloudo');
    else if (
      weather.toLowerCase().includes('clear') ||
      weather.toLowerCase().includes('sun')
    )
      return this.weatherIcon(MaterialCommunityIcons, 'weather-sunny');
    else if (weather.toLowerCase().includes('rain'))
      return this.weatherIcon(MaterialCommunityIcons, 'weather-pouring');
    else if (weather.toLowerCase().includes('snow'))
      return this.weatherIcon(MaterialCommunityIcons, 'weather-snowy-heavy');
    else if (weather.toLowerCase().includes('thunderstorm'))
      return this.weatherIcon(
        MaterialCommunityIcons,
        'weather-lightning-rainy',
      );
    else if (weather.toLowerCase().includes('wind'))
      return this.weatherIcon(MaterialCommunityIcons, 'weather-windy');
    else if (weather.toLowerCase().includes('overcast'))
      return this.weatherIcon(MaterialCommunityIcons, 'weather-sunset-down');
  };

  render() {
    const {selectedCity, horizontalList} = this.state;
    const {loadingDetail, weatherDetail} = this.props;

    console.log('check detail ', weatherDetail);

    return (
      <View style={styles.container}>
        <DetailHeader title={'cliMate'} onLeftPress={this.leftPressHeader} />
        <View style={[styles.imageContainer, styles.elevationCardStyle]}>
          <Image style={[styles.image]} source={Images.ny}></Image>
        </View>
        {loadingDetail ? (
          <ActivityIndicator size="small" style={styles.loading} />
        ) : (
          <View style={{flex: 1}}>
            <Text style={styles.name}>{selectedCity.EnglishName}</Text>
            <Text style={styles.name}>{selectedCity.Country.EnglishName}</Text>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              // onMomentumScrollEnd={() => this.transactionList(selectedCardIndex)}
              // onScrollIndexChanged={i => this.onCardChange(i)}
              data={horizontalList}
              removeClippedSubviews={false}
              // scrollEnabled={!transactionLoading}
              renderItem={this._renderHorizontal}
              sliderWidth={Metrics.screenWidth}
              itemWidth={Metrics.screenWidth * 0.8}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {loadingDetail, weatherDetail} = state.weather;
  return {loadingDetail, weatherDetail};
};

DetailScreen = connect(mapStateToProps, {
  retrieveWeatherDetail,
})(DetailScreen);

export default DetailScreen;
