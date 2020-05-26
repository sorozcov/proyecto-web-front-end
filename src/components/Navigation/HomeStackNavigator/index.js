import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeFeed from '../../Home';
import Profile from '../../Profile';



const Stack = createStackNavigator();

export default function HomeStack({navigation,route}) {
  return (
   
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerMode: 'screen'}} initialRouteName="HomeFeed">
        <Stack.Screen 
            name="HomeFeed" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={HomeFeed} />
        <Stack.Screen 
            name="Profile" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={Profile} />
        
      </Stack.Navigator>
   
  );
}