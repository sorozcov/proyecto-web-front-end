import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Notifications from '../../Notifications';



const Stack = createStackNavigator();

export default function NotificationsStack({navigation,route}) {
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  };
  return (
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerMode: 'screen'}} initialRouteName="Notifications">
        <Stack.Screen 
            name="Notifications" 
            options={{ title: 'Notificaciones', headerTitleAlign:'center'}} 
            component={Notifications} />
        
      </Stack.Navigator>
   
  );
}