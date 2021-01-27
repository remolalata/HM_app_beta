/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { enableScreens } from 'react-native-screens';

import MainDrawerNavigator from './src/navigations/MainNavigator';

enableScreens();

const App = () => {
  return <MainDrawerNavigator />
}

export default App;
