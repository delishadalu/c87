import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export default class Profile extends Component {
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.props.navigation.navigate('Dashboard');
      else this.props.navigation.navigate('Login');
    });
  };

  componentDidMount() {
    this.checkIfLoggedIn();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>loading</Text>
      </View>
    );
  }
}
