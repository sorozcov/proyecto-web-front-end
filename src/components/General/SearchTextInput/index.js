import React from 'react';
import { StyleSheet, View,TextInput,Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function SearchTextInput({onChange,value,disabled,label,placeholder,keyboardType,secureTextEntry,multiline,maxLength,style}) {
  return (
    <View style={styles.flexRow}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name="magnify"
          color='black'
          size={wp('10%')}
        />
      </View>
      <TextInput
        onChangeText={onChange}
        value={value}
        placeholderTextColor={'gray'}
        mode={'outlined'}
        editable={disabled == null}
        label={label}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        returnKeyType={"done"}
        multiline={multiline}
        maxLength={maxLength}
        style={{...styles.inputContainerStyle,...style}}
        />        
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: { 
    height:hp('7.5%'), 
    marginLeft: wp('5%'),
    fontSize:wp('4.5%'),
    width:wp('80%'),
  },
  icon: {
    height:hp('7.5%'),
    marginLeft:wp('3%'),
    justifyContent:"center",
  },
  flexRow:{
    flexDirection:'row',
    marginRight: wp('0%'),
    backgroundColor:'#e1e3ed'

  },
});