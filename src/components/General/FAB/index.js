/* -------------------------------------------------------------------------- */
/*                               Componente FAB                               */
/* -------------------------------------------------------------------------- */
// Este componente contiene un botón flotante que se utiliza en muchas pantallas de la aplicación.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function FAB({buttonStyle={},labelStyle={},label=null,onPress=null, icon=null,disabled=false}) {

  return (
    
      
      
      <TouchableOpacity
        style={(disabled)?{...styles.buttonStyle,...buttonStyle,backgroundColor:'#DADADA'}:{...styles.buttonStyle,...buttonStyle}}
        onPress={onPress}
        disabled={disabled}
      >
       
        {icon!=null && icon }
        {label!=null && <Text style={{...styles.labelStyle,...labelStyle}}>{label}</Text>}
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('7%'),
    backgroundColor: '#fff',
    marginEnd:0,
    marginRight:0,
  },
  buttonStyle:{
   height: hp('6.2%'),
   width: hp('6.2%'),
   position:'absolute',
   marginRight: wp('5%'),
   
   alignItems:'center',
   justifyContent:'center',
   marginTop: hp('72.5%'),
   marginLeft:wp('81.5%'),
   marginBottom: hp('5%'),
   backgroundColor:'#00ACEE',
   borderRadius:hp('50%')
  },
  labelStyle:{
      color:'white',
      fontWeight:'bold',
      fontSize:wp('5.8%'),
  }
});