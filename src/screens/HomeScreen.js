import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles/HomeScreenStyles';
import {connect} from 'react-redux';
import {retrieveWeather} from '../modules/home/HomeActions';
import Header from '../components/Header';
import City from '../components/City';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchHeader from '../components/SearchHeader';

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
  }

  componentDidMount() {
    this.props.retrieveWeather({}, this.responseHandler);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading && !this.props.loading) {
      // network call is done
    }
  }

  responseHandler = response => {
    this.setState({isError: true, errMsg: response.message});
    Alert.alert('Error', response.message);
  };

  leftPressHeader = () => {};

  rightPressHeader = () => this.setState({isSearch: true});

  onChangeSearchText = searchText => this.setState({searchText});

  clearSearch = () => this.setState({isSearch: false, searchText: ''});

  changeUnit = isCelsius => this.setState({isCelsius});

  renderList = ({item}) => {
    const {isCelsius} = this.state;
    return <City item={item} isCelsius={isCelsius} />;
  };

  render() {
    const {isCelsius, isSearch, searchText} = this.state;
    const {loading, weatherList} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {!isSearch ? (
          <Header
            title={'cliMate'}
            onLeftPress={this.leftPressHeader}
            onRightPress={this.rightPressHeader}
          />
        ) : (
          <SearchHeader
            clearSearch={this.clearSearch}
            onChangeText={this.onChangeSearchText}
          />
        )}
        {loading ? (
          <ActivityIndicator size="small" style={styles.loading} />
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={weatherList.filter(
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {loading, weatherList} = state.home;
  return {loading, weatherList};
};

HomeScreen = connect(mapStateToProps, {
  retrieveWeather,
})(HomeScreen);

export default HomeScreen;
