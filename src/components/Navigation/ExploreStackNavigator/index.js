/* -------------------------------------------------------------------------- */
/*                      Componente ExploreStackNavigation                     */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo stack entre las pantallas relacionadas a explorar.

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Explore from '../../Explore';


const Stack = createStackNavigator();

export default function ExploreStack({navigation,route}) {
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  };
  return (
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerMode: 'screen'}} initialRouteName="Explore">
        <Stack.Screen 
            name="Explore" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={Explore} />
        
      </Stack.Navigator>
   
  );
}