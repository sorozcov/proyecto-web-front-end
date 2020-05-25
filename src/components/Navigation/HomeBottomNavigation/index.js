import * as React from 'react';
import { Text, Platform,Image,View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FAB from '../../General/FAB';
import * as selectors from '../../../reducers';
import { connect } from 'react-redux';
import HomeStack from '../HomeStackNavigator';





const Tab = createBottomTabNavigator();

function componentExample(){
  return(<View style={{height:hp('100%')}}>
      
  </View>)
}

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
        <Tab.Screen name="Explore" component={componentExample} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="magnify" color={color} size={30}
             style={{ marginTop: 0,paddingBottom:8 }}/>
           ),
         }}/>
         <Tab.Screen name="Notifications" component={componentExample} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
             <MaterialCommunityIcons name="bell-outline" color={color} size={30}
             style={{ marginTop: 0,paddingBottom:8 }}/>
           ),
         }}/>
         <Tab.Screen name="Messages" component={componentExample} 
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