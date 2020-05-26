import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image,FlatList,Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as profileActions from '../../actions/profile';
import ModalLoading from '../General/ModalLoading';
var moment = require('moment');

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';



function Profile({ navigation, startFetchingProfile, isFetchingProfile, profileInfo, profileFollowers, profileFollowing, profileMyTweets, profileLikedTweets }) {
  useEffect(startFetchingProfile,[]);
  return (
    <View style={styles.container}>
    {profileInfo!==null &&
      <View style={styles.userInfoSection}>

        <Image style={{borderRadius:hp('50%'),height:hp('8%'),width:hp('8%')}} source={require('../../assets/images/egg.jpg')}></Image>
        <Text style={styles.title}>{profileInfo.first_name + " "+ profileInfo.last_name}</Text>
        <Text style={styles.caption}>@{profileInfo.username}</Text>
        <View style={{flexDirection:'row',flex:1,paddingTop:hp('1%')}}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            color='black'
            size={wp('5%')}
          />
          <Text style={styles.caption}>{' Se unió en ' + moment(profileInfo.date_joined).subtract(1, "month").startOf("month").format('MMMM') + ' de ' + moment(profileInfo.date_joined).year() }</Text>
        </View>
        <View style={{flexDirection:'row',flex:1,paddingTop:hp('0.5%')}}>
          <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{profileInfo.following} </Text>
          <Text style={styles.caption}>Siguiendo </Text>
          <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{profileInfo.followers} </Text>
          <Text style={styles.caption}>Seguidores </Text>
        </View>
      </View>}
      
    <ModalLoading isLoading={isFetchingProfile}/>
      <FAB 
        icon={(<MaterialCommunityIcons name="feather" color={'white'} size={27} />)}
        />
    </View>
  );
}

export default connect(
  state => ({
    profileInfo: selectors.getProfileInfo(state),
    profileFollowers: selectors.getProfileFollowers(state),
    profileFollowing: selectors.getProfileFollowings(state),
    profileMyTweets: selectors.getProfileMyTweets(state),
    profileLikedTweets: selectors.getProfileLikedTweets(state),
    isFetchingProfile: selectors.isProfileFetching(state),
  }),
  dispatch => ({
    startFetchingProfile() {
      dispatch(profileActions.startFetchingProfileInfo());      
    },
  }),
)(Profile);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor:'white',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
    height: hp('27%'),
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    textTransform:'uppercase',
   
    color:'black'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    paddingTop:5,
  
    color:'gray'
  },
});