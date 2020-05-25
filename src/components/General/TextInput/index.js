import React from 'react';
import { StyleSheet, View,TextInput,Text } from 'react-native';



export default function MyTextInput(props) {
  const { input, meta, ...inputProps } = props;

  return (
    <View style={{flex:(meta.touched && meta.error)?0.15:0.10,marginTop:5,marginBottom:5,...inputProps.containerStyle}}>
      
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
        
      {meta.touched && (meta.error && <View style={{flex:0.5}}><Text style={styles.textError}>{meta.error}</Text></View>)}
        
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: { 
    flex:1, 
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius:10,
    marginLeft:'5%',
    marginRight:'5%',
    paddingLeft:'4%',
    fontSize:17 },
  textError: {
    color: 'red',
    paddingLeft: 30,
    paddingRight: 20,
    paddingTop:5
  },
});