import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Button from '../General/Button';
import TextInput from '../General/TextInput'
import ModalLoading from '../General/ModalLoading';
import * as selectors from '../../reducers';
import * as SignUpActions from '../../actions/signUp'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

function Login({navigation, dirty, valid, handleSubmit,startSignUp,isLoading,isAuthenticated,error}) {
  const signUp = values => {
    startSignUp(navigation,values)
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
    
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    
   style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.container}>
      
      <View style={{height:hp('2%')}}/>
      <View style={styles.imageContainer}>
          <MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={80}/>
      </View>
      
      <View style={{height:hp('7%')}}/>
     
      <Field name={'username'} component={TextInput} label='Usuario' placeholder='Ingresa un nombre de usuario' keyboardType='default' />
      <Field name={'email'} component={TextInput} label='Correo' placeholder='Ingresa tu correo' keyboardType='email-address' />
      <Field name={'first_name'} component={TextInput} label='Nombre' placeholder='Ingresa tu nombre' keyboardType='default' />
      <Field name={'last_name'} component={TextInput} label='Apellido' placeholder='Ingresa tu apellido' keyboardType='default' />
      <Field name={'password'} component={TextInput} label='Contraseña' placeholder='Ingresa tu contraseña' secureTextEntry={true}/>
      <Field name={'passwordConfirm'} component={TextInput} label='Confirmar Contrase;a' placeholder='Confirmar contraseña' secureTextEntry={true}/>
      
      
      <Button label={'Crear Cuenta'} 
       disabled={!(dirty && valid)}
       onPress={handleSubmit(signUp)}/>

    
    
      <ModalLoading isLoading={isLoading}/>
      </ScrollView>
  
    </KeyboardAvoidingView>
    
  );
}

export default connect(
  state => ({
    isLoading: selectors.getIsSigningUpUser(state) || selectors.getIsAuthenticating(state),
    isAuthenticated: selectors.isAuthenticated(state),
    issue: selectors.getSigningUpError(state),
   
  }),
  dispatch => ({
    startSignUp(navigation,values) {
      dispatch(SignUpActions.startSignUp(values));
      //navigation.replace('Login');
    },
  }),
)(reduxForm({ 
  form: 'signUp',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};
    errors.email = !values.email
      ? 'Este campo es obligatorio'
      :  !values.email.includes('@')
      ? 'Tienes que ingresar un correo válido.'
      : undefined;
    errors.username = !values.username
      ? 'Este campo es obligatorio'
      : undefined;
    errors.first_name = !values.first_name
      ? 'Este campo es obligatorio'
      : undefined;
    errors.last_name = !values.last_name
      ? 'Este campo es obligatorio'
      : undefined;
      errors.password = !values.password
        ? 'Este campo es obligatorio'
        : undefined;
      errors.passwordConfirm = !values.passwordConfirm
        ? 'Debe confirmar su contraseña'
        : values.passwordConfirm !== values.password 
        ? 'La contraseñas ingresadas no coinciden'
        : undefined;


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
  textStyle:{
    paddingLeft:'10%',
    paddingRight:'5%',
    fontSize:16,
    paddingTop:'4%',
    
  },
  contentContainer: {
    paddingTop: 30,
  },

});