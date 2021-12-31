import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles/HomeScreenStyles';
import {connect} from 'react-redux';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsg: '',
    };
  }

  render() {
    const {} = this.state;
    const {loading} = this.props;

    return (
      <View>
        <Text>Hi</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {loading} = state.home;
  return {loading};
};

HomeScreen = connect(mapStateToProps, {
  //   retrieveWeather,
})(HomeScreen);

export default HomeScreen;
