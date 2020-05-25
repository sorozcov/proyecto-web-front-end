import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from '../../Login';
import SignUpScreen from '../../SignUp';
import StartScreen from '../../Start';
import HomeRootNavigator from '../HomeRootNavigator';
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/auth';


const Stack = createStackNavigator();

function MainStack({navigation,route,isAuthenticated,savePersistedStorage}) {
  const [verify, setVerify] = useState(false);
  async function getPersistedStorage() {
    try {
      const token = JSON.parse(await AsyncStorage.getItem('auth'));
      console.log(verify);
      if(!isAuthenticated && token !== null){
        savePersistedStorage(token);
      }else {
        setVerify(true);
      } 
    } catch (error) {
      console.log(error);
    }
  }
  getPersistedStorage();
  return (
    <NavigationContainer>
      { verify && (
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerMode: 'screen'}} initialRouteName={isAuthenticated ? "Home" : "Start"}>
      <Stack.Screen name="Start" options={{ title: 'Twitter', headerTitleAlign:'center'}} component={StartScreen} />
        <Stack.Screen name="Login" options={{ title: 'Iniciar Sesión', headerTitleAlign:'center'}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ title: 'Crear Cuenta', headerTitleAlign:'center'}} component={SignUpScreen} />
        <Stack.Screen name="Home" options={{ headerShown:false}} component={HomeRootNavigator} />
      </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default connect(
  state => ({
    isAuthenticated: selectors.isAuthenticated(state),
  }),
  dispatch => ({
    savePersistedStorage(token) {
      dispatch(actions.completeLogin(token));
      dispatch(actions.authenticationUserInformationStarted());
    },
  }),
)(MainStack);