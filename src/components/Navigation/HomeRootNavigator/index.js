import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as selectors from '../../../reducers';
import { connect } from 'react-redux';
import DrawerScreen from '../HomeDrawerNavigation'
import BottomNavigationScreen from '../HomeBottomNavigation'
import { CommonActions } from '@react-navigation/native';


const DrawerR = createDrawerNavigator();

function RootNavigator({navigation,isAuthenticated}) {
  if(!isAuthenticated){
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Start' },
         
        ],
      })
    );
  }
  return (
    <DrawerR.Navigator drawerContent={() => <DrawerScreen navigation={navigation}  />}>
      <DrawerR.Screen name="Main" component={BottomNavigationScreen} />
    </DrawerR.Navigator>
  );
};



export default connect(
  state => ({
    user: selectors.getAuthUser(state),
    isAuthenticated: selectors.isAuthenticated(state),
  }),
  dispatch => ({
    logout(navigation) {
      navigation.replace('Start');
    },
  }),
)(RootNavigator);