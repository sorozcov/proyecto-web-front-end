import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from '../../Login';
import SignUpScreen from '../../SignUp';
import StartScreen from '../../Start';



const Stack = createStackNavigator();

export default function MainStack({navigation,route}) {
  console.log(route);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        
        headerMode: 'screen'}} initialRouteName="Start">
      <Stack.Screen name="Start" options={{ title: 'Twitter', headerTitleAlign:'center'}} component={StartScreen} />
        <Stack.Screen name="Login" options={{ title: 'Iniciar Sesión', headerTitleAlign:'center'}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ title: 'Crear Cuenta', headerTitleAlign:'center'}} component={SignUpScreen} />
        <Stack.Screen name="Home" options={{ title: 'Inicio', headerTitleAlign:'center'}} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}