/* -------------------------------------------------------------------------- */
/*                       Componente HomeBottomNavigation                      */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo bottom entre las todas las pantallas 
// dentro de la aplicación luego de iniciar sesión.

import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as selectors from '../../../reducers';
import { connect } from 'react-redux';
import HomeStack from '../HomeStackNavigator';
import DirectMessagesStack from '../DirectMessagesStackNavigator';
import NotificationsStackNavigator from '../NotificationsStackNavigator';
import ExploreStackNavigator from '../ExploreStackNavigator';


const Tab = createBottomTabNavigator();

function HomeBottomNavigation({navigation}) {
 

  return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          keyboardHidesTabBar:true,
          activeBackgroundColor:"#f0edf6",
          activeTintColor:'#00ACEE',
          inactiveTintColor:"gray",
          inactiveBackgroundColor:"#000000",
          tabStyle:{ backgroundColor: 'white',paddingBottom:Platform.OS=="ios" ?30:8,marginBottom:Platform.OS=="ios" ? -40:0,paddingTop:20,marginTop:-10,fontSize:'50px'},
          labelStyle:{fontSize: 12}
        }}
        >
       
        <Tab.Screen name="Home"  component={HomeStack}
          options={{            
            tabBarLabel: '',
            
            tabBarIcon: ({ color}) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={30}
              style={{ marginTop: 0,paddingBottom:8 }} />
            ),
          }}
        />
        <Tab.Screen name="Explore" component={ExploreStackNavigator} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="magnify" color={color} size={30}
             style={{ marginTop: 0,paddingBottom:8 }}/>
           ),
         }}/>
         <Tab.Screen name="Notifications" component={NotificationsStackNavigator} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="bell-outline" color={color} size={30}
             style={{ marginTop: 0,paddingBottom:8 }}/>
           ),
         }}/>
         <Tab.Screen name="Messages" component={DirectMessagesStack} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="email-outline" color={color} size={30}
             style={{ marginTop: 0,paddingBottom:8 }}/>
           ),
         }}/>
             
      </Tab.Navigator>
  );
}




export default connect(
  state => ({
    user: selectors.getAuthUser(state),
  }),
  dispatch => ({
    logout(navigation) {
      //dispatch(actionsLoggedUser.logout());
      navigation.replace('Start');
    },
  }),
)(HomeBottomNavigation);