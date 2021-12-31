import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import styles from './styles/DetailScreenStyles';
import {connect} from 'react-redux';
import {retrieveWeather} from '../modules/home/HomeActions';
import DetailHeader from '../components/DetailHeader';
import {Actions} from 'react-native-router-flux';
import {Images} from '../themes';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsg: '',
      isCelsius: false,
      selectedCity: props.SELECTED_CITY,
    };
  }

  componentDidMount() {}

  leftPressHeader = () => Actions.pop();

  changeUnit = isCelsius => this.setState({isCelsius});

  render() {
    const {selectedCity} = this.state;
    const {loading, weatherList} = this.props;

    return (
      <View style={styles.container}>
        <DetailHeader title={'cliMate'} onLeftPress={this.leftPressHeader} />
        <View style={[styles.imageContainer, styles.elevationCardStyle]}>
          <Image style={[styles.image]} source={Images.ny}></Image>
        </View>
        <Text style={styles.name}>{selectedCity.EnglishName}</Text>
        <Text style={styles.name}>{selectedCity.Country.EnglishName}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {loading, weatherList} = state.home;
  return {loading, weatherList};
};

DetailScreen = connect(mapStateToProps, {
  retrieveWeather,
})(DetailScreen);

export default DetailScreen;
