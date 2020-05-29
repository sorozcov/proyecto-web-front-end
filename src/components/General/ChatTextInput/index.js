import React from 'react';
import { StyleSheet, View,TextInput,Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function ChatTextInput({onChange,value,disabled,label,placeholder,keyboardType,secureTextEntry,multiline,maxLength,style, send}) {
  return (
    <View style={styles.flexRow}>
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
      <TouchableOpacity style={styles.icon} onPress={send}>
        <MaterialCommunityIcons
          name="send"
          color='#00ACEE'
          size={wp('7%')}
        />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: { 
    height:hp('6%'), 
    marginLeft: wp('3%'),
    marginBottom: wp('2%'),
    fontSize:wp('4.5%'),
    width:wp('78%'),
    borderBottomWidth:1,
    borderBottomColor:'#bab9b8',
  },
  icon: {
    height:hp('5%'),
    paddingLeft:wp('4%'),
    borderLeftWidth:1,
    borderLeftColor:'#d4d3d2',
    marginLeft:wp('3%'),
    justifyContent:"center",
  },
  flexRow:{
    flexDirection:'row',
    height:hp('8%'),
    marginRight: wp('0%'),
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'#d4d3d2',
    alignItems:'center'
  },
});