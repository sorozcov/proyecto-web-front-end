/* -------------------------------------------------------------------------- */
/*                              Componente Button                             */
/* -------------------------------------------------------------------------- */
// Este componente contiene un botón genérico que se utiliza en muchas pantallas de la aplicación.

import React from 'react';
import { StyleSheet, Text,TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Button({buttonStyle={},labelStyle={},label="",onPress=null, icon=null,disabled=false}) {

  return (
    
      
      
      <TouchableOpacity
        style={(disabled)?{...styles.buttonStyle,...buttonStyle,backgroundColor:'#DADADA'}:{...styles.buttonStyle,...buttonStyle}}
        onPress={onPress}
        disabled={disabled}
      >
       
        {icon!=null && icon }
        <Text style={{...styles.labelStyle,...labelStyle}}>{label}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('7%'),
    backgroundColor: '#fff',
   
  },
  buttonStyle:{
   height: hp('7%'),
   marginLeft: wp('5%'),
   marginRight: wp('5%'),
   alignItems:'center',
   justifyContent:'center',
   flexDirection:'row',
   display:'flex',
   borderRadius: 20,
   marginTop: hp('1%'),
   marginBottom: hp('1%'),
   backgroundColor:'#00ACEE'
  },
  labelStyle:{
      color:'white',
      fontWeight:'bold',
      fontSize:wp('5.8%'),
  }
});