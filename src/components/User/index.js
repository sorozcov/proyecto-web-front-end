import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actionsProfile from '../../actions/profile';
import Button from '../General/Button';


function User({navigation,user,styleContainer={},selectProfileUserId,otherAction=false, action}) {
    return(
    <View style={{...styles.userContainer,...styleContainer}}>
      <View style={styles.flexRow}>
        <TouchableOpacity onPress={()=> {(!otherAction) ?  selectProfileUserId(navigation,user.id) : action()}}>
          <View style={styles.imageContainer} >
              <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.titleContainer}>    
          <Text numberOfLines={1} style={styles.userNameStyle}>{user.first_name + " "+ user.last_name}</Text>
          <Text numberOfLines={1}  style={styles.infoUserNameStyle}>@{user.username}</Text>
        </View>
        {/* <Button label={'Siguiendo'} buttonStyle={{height: hp('4%'),width: wp('25%')}} labelStyle={{fontSize:wp('3.2%')}} onPress={()=> console.log('Hola')} />       */}
      </View>
    </View>
  )

}


export default connect(
    state => ({
      userLoggedIn: selectors.getAuthUser(state),
      token:selectors.getAuthToken(state),     
    }),
    dispatch => ({
        selectProfileUserId(navigation, userId){
            dispatch(actionsProfile.setSelectedProfileUserId(userId));
            navigation.navigate('Profile');
        }
    }),
  )(User);
const styles = StyleSheet.create({
    userContainer: {
        width:wp('100%'),
        backgroundColor:'white',
        borderBottomColor:'#EAEAEA',
        borderBottomWidth:0.5,
        flexDirection:'column'
    },
    flexRow:{
        flexDirection:'row'
    },
    imageContainer:{
        width:wp('18%')
    },
    imageProfile:{
        borderRadius:hp('50%'),
        height:hp('6%'),
        width:hp('6%'),
        margin:wp('3%'),
        marginTop:wp('2%'),
    },
    userNameStyle:{
        marginTop:wp('1%'),
        fontSize:wp('4.3%'),
        fontWeight:'bold',
    },
    infoUserNameStyle:{
        marginTop:wp('0%'),
        color:'gray',
        fontSize:wp('4.3%'),
    },
    titleContainer:{
        width:wp('48%')
    },
  });

