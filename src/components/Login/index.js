import React,{useEffect} from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Button from '../General/Button';
import TextInput from '../General/TextInput'
import ModalLoading from '../General/ModalLoading';
import * as selectors from '../../reducers';
import * as AuthActions from '../../actions/auth';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';



function Login({navigation, dirty, valid, handleSubmit,startLogin,isLoading,user,isAuthenticated}) {
  const login = values => {
    startLogin(navigation,values)
  }
  
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
      
      <View style={{height:hp('14%')}}/>
     
      <Field name={'username'} component={TextInput} label='Username' placeholder='Ingresa tu usuario' keyboardType='default' />
      <Field name={'password'} component={TextInput} label='Contraseña' placeholder='Ingresa tu contraseña' secureTextEntry={true}/>
     
     
      <Button label={'Iniciar sesión'} 
       disabled={!(dirty && valid)}
       onPress={handleSubmit(login)}/>
      
    
      <View style={{height:hp('10%')}}/>
        <ModalLoading isLoading={isLoading}/>
      </View>
  );
}

export default connect(
  state => ({
    isLoading: selectors.getIsAuthenticating(state),
    isAuthenticated: selectors.isAuthenticated(state),
    user: selectors.getAuthUser(state),
    token:selectors.getAuthToken(state),
   
  }),
  dispatch => ({
    startLogin(navigation,values) {
      dispatch(AuthActions.startLogin(values));
      //navigation.replace('Login');
    },
  }),
)(reduxForm({ 
  form: 'login',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};

    errors.username = !values.username
      ? 'Este campo es obligatorio'
      : undefined;
      errors.password = !values.password
        ? 'Este campo es obligatorio'
        : undefined;
      // errors.passwordConfirm = !values.passwordConfirm
      //   ? 'Debe confirmar su contraseña'
      //   : values.passwordConfirm !== values.password 
      //   ? 'La contraseñas ingresadas no coinciden'
      //   : undefined;


    return errors;
  }
})(Login));


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

});