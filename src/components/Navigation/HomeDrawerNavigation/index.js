import * as React from 'react';
import { Text, View, StyleSheet, Platform,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerItem,DrawerContentScrollView } from '@react-navigation/drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

import * as selectors from '../../../reducers';
import * as actionsAuth from '../../../actions/auth'


function DrawerScreen({navigation,user,logout,userInformation}) {
 //console.log(userInformation);
  return (
    <DrawerContentScrollView >
    <View
      style={
        styles.drawerContent
      }
    >
    {userInformation!==null &&
      <View style={styles.userInfoSection}>

        <Image style={{borderRadius:hp('50%'),height:hp('8%'),width:hp('8%')}} source={require('../../../assets/images/user.jpg')}></Image>
        <Text style={styles.title}>{userInformation.first_name + " "+ userInformation.last_name}</Text>
        <Text style={styles.caption}>@{userInformation.username}</Text>
        <View style={{flexDirection:'row',flex:1,paddingTop:10}}>
          <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{userInformation.following} </Text>
          <Text style={styles.caption}>Siguiendo </Text>
          <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{userInformation.following} </Text>
          <Text style={styles.caption}>Seguidores </Text>
        </View>
      </View>}

      <DrawerItem
          icon={({ color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          )}
          style={{paddingTop:0,marginTop:0}}
          label="Perfil"
          labelStyle={{ fontSize: 16}}
          // onPress={() => navigation.navigate('Perfil', { screen: 'ProfilesScreen' })}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="logout"
              color={color}
              size={size}
            />
          )}
          style={{paddingTop:0,marginTop:0,}}
          label="Cerrar sesión"
          labelStyle={{ fontSize: 16, }}
          onPress={() => logout(navigation)}
        />
        
          
       

      </View>
    </DrawerContentScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
   
    backgroundColor: '#fff',
   
  },
  topContainer: {
    height: hp('100%'),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  inputContainerStyle: {
    margin: 8,
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop:40,
    resizeMode: 'contain',
    alignSelf:'center',
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  textStyle:{
    textAlign: 'center', 
    
    fontSize:16
  },
  drawerContent: {
    height: hp('100%'),
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor:'white',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
    height: hp('20%'),
  },

  title: {
    marginTop: 20,
    fontWeight: 'bold',
    textTransform:'uppercase',
   
    color:'black'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    paddingTop:5,
  
    color:'gray'
  },

});


export default connect(
  state => ({
    user: selectors.getAuthUser(state),
    userInformation: selectors.getAuthUserInformation(state),
  }),
  dispatch => ({
    async logout(navigation) {
      await AsyncStorage.removeItem('auth');
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