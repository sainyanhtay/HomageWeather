import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import styles from './styles/HomeScreenStyles';
import {connect} from 'react-redux';
import {retrieveWeather} from '../modules/weather/WeatherActions';
import Header from '../components/Header';
import City from '../components/City';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchHeader from '../components/SearchHeader';
import {Actions} from 'react-native-router-flux';

const ANIMATION_DURATION = 250;

const itemsToAnimation = 10;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsg: '',
      isCelsius: false,
      searchText: '',
      isSearch: false,
    };

    this.animated = [];
    for (let index = 0; index <= itemsToAnimation; index++) {
      this.animated.push(new Animated.Value(0));
    }
  }

  componentDidMount() {
    this.props.retrieveWeather({}, this.responseHandler);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading && !this.props.loading) {
      // network call is done
      this.animated.forEach((animated, index) => {
        Animated.timing(animated, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          delay: index * ANIMATION_DURATION,
          useNativeDriver: true,
        }).start();
      });
    }
  }

  responseHandler = response => {
    this.setState({isError: true, errMsg: response.message});
    Alert.alert('Error', response.message);
  };

  rightPressHeader = () => this.setState({isSearch: true});

  onChangeSearchText = searchText => this.setState({searchText});

  clearSearch = () => this.setState({isSearch: false, searchText: ''});

  changeUnit = isCelsius => this.setState({isCelsius});

  onPressDetail = SELECTED_CITY => {
    Actions.detail({SELECTED_CITY});
  };

  renderList = ({item, index}) => {
    const {isCelsius} = this.state;

    return (
      <Animated.View
        style={
          index < itemsToAnimation
            ? [
                {opacity: this.animated[index]},
                {
                  transform: [
                    {scale: this.animated[index]},
                    {
                      rotate: this.animated[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['35deg', '0deg'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]
            : null
        }>
        <City
          item={item}
          isCelsius={isCelsius}
          onPressDetail={item => this.onPressDetail(item)}
        />
      </Animated.View>
    );
  };

  render() {
    const {isCelsius, isSearch, searchText} = this.state;
    const {loading, weatherList} = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView>
          {!isSearch ? (
            <Header title={'cliMate'} onRightPress={this.rightPressHeader} />
          ) : (
            <SearchHeader
              clearSearch={this.clearSearch}
              onChangeText={this.onChangeSearchText}
              searchText={searchText}
            />
          )}
        </SafeAreaView>
        {loading ? (
          <ActivityIndicator size="small" style={styles.loading} />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={weatherList?.filter(
              e =>
                e.EnglishName.toLowerCase().includes(
                  searchText.toLowerCase(),
                ) ||
                e.Country.EnglishName.toLowerCase().includes(
                  searchText.toLowerCase(),
                ),
            )}
            renderItem={this.renderList}
          />
        )}
        <View style={[styles.elevationCardStyle, styles.unitContainer]}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.separator]}
            onPress={() => this.changeUnit(false)}>
            <Text
              style={{
                fontWeight: isCelsius ? 'normal' : 'bold',
              }}>{`\u00B0F`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.changeUnit(true)}>
            <Text
              style={{
                fontWeight: isCelsius ? 'bold' : 'normal',
              }}>{`\u00B0C`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {loading, weatherList} = state.weather;
  return {loading, weatherList};
};

HomeScreen = connect(mapStateToProps, {
  retrieveWeather,
})(HomeScreen);

export default HomeScreen;
