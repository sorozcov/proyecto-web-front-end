/* -------------------------------------------------------------------------- */
/*                   Componente NotificationsStackNavigator                   */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo Stack de todas las pantallas de notificaciones. 

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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