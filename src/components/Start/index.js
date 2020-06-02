/* -------------------------------------------------------------------------- */
/*                              Componente Start                              */
/* -------------------------------------------------------------------------- */
// Este componente muestra la pantalla de inicio de la aplicación.

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';


import Button from '../General/Button';
import * as selectors from '../../reducers';

function Start({navigation,isAuthenticated}) {
  
  if(isAuthenticated){
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
         
        ],
      })
    );
  }
  return (
    <View style={styles.container}>
      <View style={{height:hp('2%')}}/>
      <View style={styles.imageContainer}>
          <MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={80}/>
      </View>
      <View style={{height:hp('16%')}}/>
      <Text style={{...styles.textStyle,fontWeight:'bold',fontSize:wp('8.5%')}}>
        Entérate de lo que está pasando en el mundo en este momento.  
      </Text>
      <Button label={'Crear una cuenta'}  onPress={()=>navigation.navigate('SignUp')}
      // icon={<MaterialCommunityIcons
      //         name="account"
      //         color={'white'}
      //         size={30}
      //         style={{paddingRight:5}}
      //       />}
      />
    
      <View style={{height:hp('24%')}}/>
      <View style={{flexDirection:'row'}}>
          <Text style={{...styles.textStyle,color:'gray',paddingRight:wp('2%')}}>
            ¿Ya tienes una cuenta?  
          </Text>
          <TouchableOpacity style={{...styles.textStyle,paddingLeft:wp('0%')}} onPress={() => navigation.navigate('Login') }> 
            <Text style={{ fontSize:16, color: '#00ACEE', }} > 
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default connect(
  state => ({
    
    isAuthenticated: selectors.isAuthenticated(state),
    
   
  }),
  dispatch => ({
    // startLogin(navigation,values) {
    //   dispatch(AuthActions.startLogin(values));
    //   //navigation.replace('Login');
    // },
  }),
)(Start);

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#fff',
   
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: wp('20%'),
    height: hp('9%'),
    resizeMode: 'contain',
  },
  textStyle:{
    paddingLeft:wp('10%'),
    paddingRight:wp('5%'),
    fontSize:wp('4.4%'),
    paddingTop:wp('4%'),
    
  },
});