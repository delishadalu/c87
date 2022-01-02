import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";
import Loading from './screens/loadingScreen'
import Login from './screens/login'
import Dashboard from './screens/dashBoard'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import firebase from 'firebase'
import {firebaseConfig} from './config'

if(!firebase.apps.length)
firebase.initializeApp(firebaseConfig);
else firebase.app()

export default function App() {
  return (
   <AppContainer />
  );
}

const SwitchNavigator =createSwitchNavigator({
  Loading:Loading,
  Login:Login,
  Dashboard:Dashboard
})

const AppContainer =createAppContainer(SwitchNavigator)