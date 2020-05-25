import * as React from 'react';
import { Text, View, StyleSheet, Platform,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerItem,DrawerContentScrollView } from '@react-navigation/drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { CommonActions } from '@react-navigation/native';

import * as selectors from '../../../reducers';
import { connect } from 'react-redux';
import * as actionsAuth from '../../../actions/auth'


function DrawerScreen({navigation,user,logout}) {
 
  return (
    <DrawerContentScrollView >
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>

        
          {/* <Title style={styles.title}>{user.name + " "+ user.lastName}</Title>
          <Caption style={styles.caption}>{user.email}</Caption>
          */}
        </View>

        <DrawerItem
            icon={({ color="red", size=20 }) => (
              <MaterialCommunityIcons
                name="account"
                color={'gray'}
                size={wp('7%')}
              />
            )}
            label="Perfil"
            labelStyle={{ fontSize: wp('4.5%')}}
            // onPress={() => navigation.navigate('Perfil', { screen: 'ProfilesScreen' })}
          />
          <DrawerItem
            icon={() => (
              <MaterialCommunityIcons
                name="account"
                color={'gray'}
                size={wp('7%')}
              />
            )}
            label="Cerrar sesión"
            labelStyle={{ fontSize: wp('4.5%'), }}
            onPress={() => logout(navigation)}
          /> 
      </View>
    </DrawerContentScrollView>
  );
}



const styles = StyleSheet.create({
  drawerContent: {
    height: hp('100%'),
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor:'black',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
   
    color:'white'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  
    color:'white'
  },
  restaurantName: {
    fontSize: 14,
    lineHeight: 14,
   
    color:'black',

  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});


export default connect(
  state => ({
    user: selectors.getAuthUser(state),
  }),
  dispatch => ({
    logout(navigation) {
      dispatch(actionsAuth.logout());
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Start' },
           
          ],
        })
      );
    },
  }),
)(DrawerScreen);