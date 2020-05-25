import * as React from 'react';
import { Text, View, StyleSheet, Platform,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerItem,DrawerContentScrollView } from '@react-navigation/drawer';
import * as selectors from '../../../reducers';
import { connect } from 'react-redux';
import * as actionsAuth from '../../../actions/auth'
import Constants from 'expo-constants';




function DrawerScreen({navigation,user,logout}) {
 
  return (
    <DrawerContentScrollView >
    <View
      style={
        styles.drawerContent
      }
    >
   
      <View style={styles.userInfoSection}>

       
        {/* <Title style={styles.title}>{user.name + " "+ user.lastName}</Title>
        <Caption style={styles.caption}>{user.email}</Caption>
        */}
      </View>

      <DrawerItem
          icon={({ color="red", size=20 }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          )}
          label="Perfil"
          labelStyle={{ fontSize: 16}}
          // onPress={() => navigation.navigate('Perfil', { screen: 'ProfilesScreen' })}
        />
        <DrawerItem
          icon={({ color="red", size=20 }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          )}
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
   
  },
  topContainer: {
    flex: 0.8,
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
    flex: 1,
    flexDirection:'column',
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor:'black',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
  },
  checkpointInfo: {
    paddingLeft: 20,
    backgroundColor:'red',
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
      navigation.navigate('Start');
    },
  }),
)(DrawerScreen);