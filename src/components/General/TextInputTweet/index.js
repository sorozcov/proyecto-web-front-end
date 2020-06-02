/* -------------------------------------------------------------------------- */
/*                        Componente TextInputTweet                           */
/* -------------------------------------------------------------------------- */
// Este componente contiene un textInput genérico que se utiliza enla pantalla de creación de un tweet y un comentario.

import React from 'react';
import { StyleSheet, View,TextInput } from 'react-native';
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
        selectionColor={'#00ACEE'}
        placeholderTextColor={'gray'}
        autoFocus={true}
        editable={inputProps.disabled == null}
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        keyboardType={inputProps.keyboardType}
        maxLength={240}
        returnKeyType={"done"}
        multiline={inputProps.multiline}
        style={{...styles.inputContainerStyle,...inputProps.style}}
        />
        
    
        
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: {
    textAlignVertical:'top', 
    height:hp('100%'), 
    marginLeft: wp('2%'),
    marginRight: wp('0%'),
    paddingLeft: wp('4%'),
    paddingTop: wp('4%'),
    fontSize:wp('4.5%'),
  },
  textError: {
    color: 'red',
    paddingLeft: hp('4%'),
    paddingTop: hp('0.1%')
  },
});