/* -------------------------------------------------------------------------- */
/*                            Componente TextInput                            */
/* -------------------------------------------------------------------------- */
// Este componente contiene un textinput genérico que se utiliza en muchas pantallas de la aplicación.

import React from 'react';
import { StyleSheet, View,TextInput,Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function MyTextInput(props) {
  const { input, meta, ...inputProps } = props;
  return (
    <View style={{height:(meta.touched && meta.error) ? hp('10%') : hp('7.5%'),marginTop:5,marginBottom:5,...inputProps.containerStyle}}>
      
      <TextInput
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        placeholderTextColor={'gray'}
        mode={'outlined'}
        editable={inputProps.disabled == null}
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        keyboardType={inputProps.keyboardType}
        secureTextEntry={inputProps.secureTextEntry}
        returnKeyType={"done"}
        multiline={inputProps.multiline}
        maxLength={inputProps.maxLength}
        style={{...styles.inputContainerStyle,...inputProps.style}}
        />
        
      {meta.touched && (meta.error && <View style={{height:hp('7%')}}><Text style={styles.textError}>{meta.error}</Text></View>)}
        
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: { 
    height:hp('7.5%'), 
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius:10,
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    paddingLeft: wp('4%'),
    fontSize:wp('4.5%') 
  },
  textError: {
    color: 'red',
    paddingLeft: hp('4%'),
    paddingTop: hp('0.1%')
  },
});