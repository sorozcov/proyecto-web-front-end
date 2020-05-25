import React,{useEffect} from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import Button from '../General/Button';
import TextInput from '../General/TextInput'
import ModalLoading from '../General/ModalLoading';
import * as selectors from '../../reducers';
import * as AuthActions from '../../actions/auth'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function Login({navigation, dirty, valid, handleSubmit,startLogin,isLoading,user,isAuthenticated}) {
  const login = values => {
    console.log('Login Form', values)
    startLogin(navigation,values)
  }
  
  if(isAuthenticated){
    navigation.navigate("Home")
  }

  return (
    <View style={styles.container}>
      <View style={{flex:0.02}}/>
      <View style={styles.imageContainer}>
          <Image
            source={ require('../../assets/images/twitter.png') }
            style={styles.logoImage}
          />
      </View>
      
      <View style={{flex:0.2}}/>
     
      <Field name={'username'} component={TextInput} label='Username' placeholder='Ingresa tu usuario' keyboardType='default' />
      <Field name={'password'} component={TextInput} label='Contraseña' placeholder='Ingresa tu contraseña' secureTextEntry={true}/>
     
     
      <Button label={'Iniciar sesión'} 
       disabled={!(dirty && valid)}
       onPress={handleSubmit(login)}/>
      
    
      <View style={{flex:0.4}}/>
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
    flex: 1,
    backgroundColor: '#fff',
   
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  textStyle:{
    paddingLeft:'10%',
    paddingRight:'5%',
    fontSize:16,
    paddingTop:'4%',
    
  },

});