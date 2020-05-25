import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
    flex: 1,
    backgroundColor: '#fff',
   
  },
  buttonStyle:{
   flex:0.085,
   marginLeft:'5%',
   marginRight:'5%',
   alignItems:'center',
   justifyContent:'center',
   flexDirection:'row',
   display:'flex',
   borderRadius:20,
   marginTop:10,
   marginBottom:10,
   backgroundColor:'#00ACEE'
  },
  labelStyle:{
      color:'white',
      fontSize:20,
      fontWeight:'500',
  }
});