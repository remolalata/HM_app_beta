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
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

import MainDrawerNavigator from './src/navigations/MainNavigator';
import postsReducer from './src/store/reducers/posts';
import groupsReducer from './src/store/reducers/groups';
import usersReducer from './src/store/reducers/users';
import userReducer from './src/store/reducers/user';
import modalsReducer from './src/store/reducers/modals';
import utilsReducer from './src/store/reducers/utils';
import productsReducer from './src/store/reducers/products';

enableScreens();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  posts: postsReducer,
  groups: groupsReducer,
  users: usersReducer,
  user: userReducer,
  modals: modalsReducer,
  utils: utilsReducer,
  products: productsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainDrawerNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App;

// npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/