import React from 'react';
import { Provider } from 'react-redux';
import MainScreenStack from './src/components/Navigation/MainStackNavigation';
import { configureStore } from './src/store';

const {store} = configureStore();
export default function App() {
  return (
    <Provider store={store}>
        <MainScreenStack/>
    </Provider>
  );
}


