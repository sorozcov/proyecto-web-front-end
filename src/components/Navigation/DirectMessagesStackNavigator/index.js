import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import DirectMessages from '../../DirectMessages';
import NewMessage from '../../NewMessage';
import Chat from '../../Chat';



const Stack = createStackNavigator();

export default function DirectMessagesStack({navigation,route}) {
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  };
  return (
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerMode: 'screen'}} initialRouteName="DirectMessages">
        <Stack.Screen 
            name="DirectMessages" 
            options={{ title: 'Mensajes', headerTitleAlign:'center'}} 
            component={DirectMessages} />
        <Stack.Screen 
            name="NewMessage" 
            options={{ title: "Nuevo mensaje", headerTitleAlign:'center'}} 
            component={NewMessage} />
        <Stack.Screen 
            name="Chat" 
            options={{ title: "Chat", headerTitleAlign:'center'}} 
            component={Chat} />
      </Stack.Navigator>
   
  );
}