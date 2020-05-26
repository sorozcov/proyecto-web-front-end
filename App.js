import React from 'react';
import { Provider } from 'react-redux';
import MainScreenStack from './src/components/Navigation/MainStackNavigation';
import { configureStore } from './src/store';

//SettingsTimeAgo
let TimeAgo = require('react-native-timeago');

let moment = require('moment'); //load moment module to set local language
require('moment/locale/es'); //for import moment local language file during the application build
moment.locale('es');//set moment local language to zh-cn

const {store} = configureStore();
export default function App() {
  return (
    <Provider store={store}>
        <MainScreenStack/>
    </Provider>
  );
}


