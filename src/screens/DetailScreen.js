import React, {Component} from 'react';
import {View, Text, ActivityIndicator, FlatList, Alert} from 'react-native';
import styles from './styles/DetailScreenStyles';
import {connect} from 'react-redux';
import {retrieveWeatherDetail} from '../modules/weather/WeatherActions';
import DetailHeader from '../components/DetailHeader';
import {Actions} from 'react-native-router-flux';
import {Colors, Images, Metrics} from '../themes';
import Carousel from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-detect';
import * as Animatable from 'react-native-animatable';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsg: '',
      isCelsius: false,
      selectedCity: props.SELECTED_CITY,
      horizontalList: [{}, {}],
      isSwiped: false,
    };
  }

  componentDidMount() {
    this.retrieveWeatherDetail(this.props.SELECTED_CITY.Key);
  }

  retrieveWeatherDetail = key =>
    this.props.retrieveWeatherDetail(key, this.responseHandler);

  responseHandler = response => {
    this.setState({isError: true, errMsg: response.message});
    Alert.alert('Error', response.message);
  };

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
    const {weatherDetail} = this.props;
    const {selectedCity} = this.state;

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
          {this.renderWeatherSign(selectedCity.WeatherText)}
          <Text
            style={
              styles.temp
            }>{`${selectedCity.Temperature.Imperial.Value.toFixed()}\u00B0F`}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{selectedCity.WeatherText}</Text>
            <Text>
              <Text
                style={
                  styles.bold
                }>{`${selectedCity.Temperature.Imperial.Value.toFixed()}\u00B0`}</Text>
              {` ${selectedCity.Temperature.Metric.Value.toFixed()}\u00B0`}
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

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    const {weatherList, loadingDetail} = this.props;
    const {selectedCity} = this.state;

    if (!loadingDetail) {
      let selectedCityIndex = weatherList.findIndex(
        item => item == selectedCity,
      );

      switch (gestureName) {
        case SWIPE_UP:
          if (selectedCityIndex < weatherList.length - 1) {
            this.setState({
              selectedCity: weatherList[selectedCityIndex + 1],
              isSwiped: true,
            });

            this._swipeViewRef?.fadeOutUpBig();
            this._ImageViewRef?.zoomOut();

            this.retrieveWeatherDetail(weatherList[selectedCityIndex + 1].Key);

            setTimeout(() => {
              // for animation duration
              this._swipeViewRef?.fadeInUpBig();
              this._ImageViewRef?.zoomIn();
            }, 500);
          }
          break;
        case SWIPE_DOWN:
          if (selectedCityIndex > 0) {
            this.setState({
              selectedCity: weatherList[selectedCityIndex - 1],
              isSwiped: true,
            });

            this._swipeViewRef?.fadeOutDownBig();
            this._ImageViewRef?.zoomOut();

            this.retrieveWeatherDetail(weatherList[selectedCityIndex - 1].Key);

            setTimeout(() => {
              // for animation duration
              this._swipeViewRef?.fadeInDownBig();
              this._ImageViewRef?.zoomIn();
            }, 500);
          }
          break;
      }
    }
  }

  render() {
    const {selectedCity, horizontalList, isSwiped} = this.state;
    const {loadingDetail, weatherDetail} = this.props;

    console.log('check detail ', weatherDetail);

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}
        style={styles.container}>
        <DetailHeader title={'cliMate'} onLeftPress={this.leftPressHeader} />
        <View style={[styles.imageContainer, styles.elevationCardStyle]}>
          {loadingDetail && !isSwiped ? (
            <ActivityIndicator size="small" style={styles.image} />
          ) : (
            <Animatable.Image
              style={[styles.image]}
              source={Images.ny}
              animation="zoomIn"
              ref={ref => (ref ? (this._ImageViewRef = ref) : null)}
            />
          )}
        </View>
        {loadingDetail && !isSwiped ? (
          <ActivityIndicator size="small" style={styles.loading} />
        ) : (
          <Animatable.View
            animation="fadeInUpBig"
            style={{flex: 1}}
            ref={ref => (ref ? (this._swipeViewRef = ref) : null)}>
            <Text style={styles.name}>{selectedCity.EnglishName}</Text>
            <Text style={styles.name}>{selectedCity.Country.EnglishName}</Text>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={horizontalList}
              removeClippedSubviews={false}
              extraData={this.state}
              renderItem={this._renderHorizontal}
              sliderWidth={Metrics.screenWidth}
              itemWidth={Metrics.screenWidth * 0.85}
            />
          </Animatable.View>
        )}
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => {
  const {loadingDetail, weatherDetail, weatherList} = state.weather;
  return {loadingDetail, weatherDetail, weatherList};
};

DetailScreen = connect(mapStateToProps, {
  retrieveWeatherDetail,
})(DetailScreen);

export default DetailScreen;
