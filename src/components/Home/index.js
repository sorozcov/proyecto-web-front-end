import React,{useEffect} from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
import Button from '../General/Button';
import TextInput from '../General/TextInput'
import ModalLoading from '../General/ModalLoading';
import * as selectors from '../../reducers';
import * as AuthActions from '../../actions/auth';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';



function HomeFeed({navigation, dirty, valid, handleSubmit,startLogin,isLoading,user,isAuthenticated}) {
  const login = values => {
    startLogin(navigation,values)
  }
  


  return (
    <View style={styles.container}>
      
      
      <ModalLoading isLoading={isLoading}/>
      <FAB 
        icon={(<MaterialCommunityIcons name="feather" color={'white'} size={27} />)}
        />
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
)(HomeFeed);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});