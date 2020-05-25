import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as selectors from '../../../reducers';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import DrawerScreen from '../HomeDrawerNavigation'
import BottomNavigationScreen from '../HomeBottomNavigation'
import TokenRefresh from '../../TokenRefresh'

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
    <React.Fragment>
      <TokenRefresh reviewTime={10000} />
      <DrawerR.Navigator drawerContent={() => <DrawerScreen navigation={navigation}  />}>
        <DrawerR.Screen name="Main" component={BottomNavigationScreen} />
      </DrawerR.Navigator>
    </React.Fragment>
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