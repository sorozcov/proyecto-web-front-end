import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import Button from '../General/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login({navigation}) {

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
      <Text style={{...styles.textStyle,fontWeight:'bold',fontSize:30}}>
        Entérate de lo que está pasando en el mundo en este momento.  
      </Text>
      <Button label={'Crear una cuenta'}  onPress={()=>navigation.navigate('Signup')}
      // icon={<MaterialCommunityIcons
      //         name="account"
      //         color={'white'}
      //         size={30}
      //         style={{paddingRight:5}}
      //       />}
      />
    
      <View style={{flex:0.4}}/>
      <Text style={{...styles.textStyle,color:'gray'}}>¿Ya tienes una cuenta?  
          <Text style={{...styles.textStyle, color: '#00ACEE', }} onPress={() => navigation.navigate('Login') }> Iniciar Sesión</Text>
      </Text>
    </View>
  );
}

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