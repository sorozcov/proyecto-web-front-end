/* -------------------------------------------------------------------------- */
/*                           Componente ButtonOption                          */
/* -------------------------------------------------------------------------- */
// Este componente es un botón multiple que recibe un arreglo con la cantidad de opciones que quiera el usuario.

import React from 'react';
import { StyleSheet, Text,TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function ButtonOption({buttonStyle={},labelStyle={},onPressVar=null, onPressAction=null, icon=null,disabled=false,options=['Uno','Dos','Tres']}) {
  return (
    
      
      options.map((option,i) => (
        <TouchableOpacity
          key={i}
          style={(disabled)
            ? {...styles.buttonStyle,...buttonStyle,backgroundColor:'#DADADA', width: wp('100%')/options.length}
            : {...styles.buttonStyle,...buttonStyle, borderBottomColor: onPressVar===i ? '#00ACEE' : 'white', width: wp('100%')/options.length}}
          onPress={()=> onPressAction(i)}
          disabled={disabled}
        >
          {icon!=null && icon }
          <Text style={{...styles.labelStyle,...labelStyle, color: onPressVar===i ? '#00ACEE' : 'gray'}}>{option}</Text>
        </TouchableOpacity>
      ))
      
  );
}

const styles = StyleSheet.create({
  buttonStyle:{
   height: hp('6.5%'),
   padding: wp('0%'), 
   borderBottomWidth: wp('1%'), 
   borderBottomColor: '#00ACEE', 
   alignItems:'center',
   justifyContent:'center',
   flexDirection:'row',
   display:'flex',
   backgroundColor:'white'
  },
  labelStyle:{
    color:'gray',
    fontWeight:'bold',
    fontSize:wp('3.5%'),
}
});