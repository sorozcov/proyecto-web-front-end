import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../General/Button';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/auth'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Login({navigation}) {

  return (
    <View style={styles.container}>
      <View style={{flex:0.02}}/>
      <View style={styles.imageContainer}>
          <Image
            source={ require('../../assets/images/twitter.png') }
            style={styles.logoImage}
          />
      </View>
      
      <View style={{flex:0.3}}/>
      
      <Button label={'Iniciar sesión'}  onPress={()=>navigation.navigate('Signup')}
      // icon={<MaterialCommunityIcons
      //         name="account"
      //         color={'white'}
      //         size={30}
      //         style={{paddingRight:5}}
      //       />}
      />
    
      <View style={{flex:0.4}}/>
      
    </View>
  );
}

export default connect(
  state => ({

    //user: selectors.getLoggedUser(state),
  }),
  dispatch => ({
    startLogin(navigation) {
      dispatch(AuthActions.startLogin({}));
      //navigation.replace('Login');
    },
  }),
)(Login);


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