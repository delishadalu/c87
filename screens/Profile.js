import React, { Component } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import firebase from 'firebase';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      light_theme: true,
      profile_image: '',
      name: '',
    };
  }

  componentDidMount() {
    this.loadFont();
    this.fetchUser();
  }

  loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  };

  fetchUser = async () => {
    var snapshot = {};
    await firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        this.setState({
          light_theme: data.val().current_theme === 'dark' ? true : false,
          name: `${data.val().first_name} ${data.val().last_name}`,
          profile_image: data.val().profile_picture,
        });
      });
  };

  

  toggleSwitch = () => {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({
        current_theme: !this.state.light_theme ? "dark" : 'light',
      });

    this.setState({ light_theme: !this.state.light_theme });
  };

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'teal',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: this.state.profile_image }}
        />
        <Text style={{marginTop:50,fontSize:40,fontFamily:'bubblegum-sans'}}>{this.state.name}</Text>
         <Text>DARK THEME</Text>
        <Switch
          style={{marginTop:50, transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          trackColor={{ false: '#767577', true: 'gray' }}
          thumbColor={this.state.light_theme ? 'red' : 'green'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={this.toggleSwitch}
          value={!this.state.light_theme}
        />
      </View>
    );
  }
}
