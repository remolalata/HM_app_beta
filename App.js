/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MainDrawerNavigator from './src/navigations/MainNavigator';
import postsReducer from './src/store/reducers/posts';
import groupsReducer from './src/store/reducers/groups';
import usersReducer from './src/store/reducers/users';
import modalsReducer from './src/store/reducers/modals';

enableScreens();

const rootReducer = combineReducers({
  posts: postsReducer,
  groups: groupsReducer,
  users: usersReducer,
  modals: modalsReducer
})

const store = createStore(rootReducer);

const App = () => {
  return <Provider store={store}><MainDrawerNavigator /></Provider>
}

export default App;

// npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/