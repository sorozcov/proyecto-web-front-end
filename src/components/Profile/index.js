import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image,FlatList,Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
var moment = require('moment');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

import * as selectors from '../../reducers';
import * as profileActions from '../../actions/profile';
import ButtonOption from '../General/ButtonOption';
import TweetList from '../TweetList';
import Tweet from '../Tweet';


function Profile({ navigation, startFetchingProfileInfo, startFetchingProfileMyTweets, startFetchingProfileLikedTweets, isFetchingProfile, SelectedUserId, profileInfo, profileMyTweets, profileLikedTweets }) {
  const refFlatList = React.useRef(null);
  const [toolBarOption, setToolBarOption] = useState(0);
  useEffect(startFetchingProfileInfo,[SelectedUserId]);
  useEffect(() => {
    if(toolBarOption===0)
      startFetchingProfileMyTweets();
    if(toolBarOption===1)
      startFetchingProfileLikedTweets();
  },[SelectedUserId,toolBarOption]);
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>

        <Image style={{borderRadius:hp('50%'),height:hp('8%'),width:hp('8%')}} source={require('../../assets/images/egg.jpg')}></Image>
        {profileInfo!==null ? (
          <>
            <Text style={styles.title}>{profileInfo.first_name + " "+ profileInfo.last_name}</Text>
            <Text style={styles.caption}>@{profileInfo.username}</Text>
            <View style={{flexDirection:'row',paddingTop:hp('1%'),height:hp('4%')}}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                color='black'
                size={wp('5%')}
              />
              <Text style={styles.caption}>{' Se unió en ' + moment(profileInfo.date_joined).subtract(1, "month").startOf("month").format('MMMM') + ' de ' + moment(profileInfo.date_joined).year() }</Text>
            </View>
              <View style={{flexDirection:'row',paddingTop:hp('0.5%'),height:hp('4%')}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Followers', { itemId: 0 })}>
                  <View style={{flexDirection:'row',height:hp('4%')}}>
                    <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{profileInfo.following} </Text>
                    <Text style={styles.caption}>Siguiendo </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Followers', { itemId: 1 })}>
                  <View style={{flexDirection:'row',height:hp('4%')}}>
                    <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{profileInfo.followers} </Text>
                    <Text style={styles.caption}>Seguidores </Text>
                  </View>
                </TouchableOpacity>
              </View>
          </>
        ) : (
          <ActivityIndicator size="large" animating={true} color='#00ACEE'/>
        )}
      </View>
      <View style={{flexDirection:'row',paddingTop:hp('0.5%'),height:hp('7%')}}>
        <ButtonOption options={['Tweets','Me Gusta']}  onPressVar={toolBarOption} onPressAction={setToolBarOption} />
      </View>
      {toolBarOption===0 && 
        <TweetList navigation={navigation} tweetArray={profileMyTweets} container={{height: hp('58%')}}
          key={'profileMyTweets'} infoText={'Aún no ha publicado ningún tweet'} 
          isFetching={isFetchingProfile}  onRefresh={()=>{
            startFetchingProfileInfo();  
            startFetchingProfileMyTweets();
          }} >
        </TweetList>
      }      
      {toolBarOption===1 && 
        <TweetList navigation={navigation} tweetArray={profileLikedTweets} container={{height: hp('58%')}}
          key={'profileLikedTweets'} infoText={'Aún no le ha gustado ningún tweet'} 
          isFetching={isFetchingProfile}  onRefresh={()=>{
            startFetchingProfileInfo();
            startFetchingProfileLikedTweets();
          }} >
        </TweetList>
      }      
        <FAB  onPress={()=>navigation.navigate('NewTweet')}
          buttonStyle={{marginTop: hp('80%'),}}
          icon={(<MaterialCommunityIcons name="feather" color={'white'} size={27} />)}
        />
    </View>
  );
}

export default connect(
  state => ({
    SelectedUserId: selectors.getProfileSelectedUserId(state),
    profileInfo: selectors.getProfileInfo(state),
    profileMyTweets: selectors.getProfileMyTweets(state),
    profileLikedTweets: selectors.getProfileLikedTweets(state),
    isFetchingProfile: selectors.isProfileFetching(state),
  }),
  dispatch => ({
    startFetchingProfileInfo() {
      dispatch(profileActions.startFetchingProfileInfo());      
    },
    startFetchingProfileMyTweets() {
      dispatch(profileActions.startFetchingProfileMyTweets());      
    },
    startFetchingProfileLikedTweets() {
      dispatch(profileActions.startFetchingProfileLikedTweets());      
    },
  }),
)(Profile);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  userInfoSection: {
    paddingLeft: wp('5%'),
    backgroundColor:'white',
    paddingBottom: hp('1.5%'),
    marginBottom: hp('-0.5%'),
    paddingTop:hp('1.5%'),
    height: hp('27%'),
  },
  title: {
    marginTop: hp('2%'),
    fontWeight: 'bold',
    textTransform:'uppercase',
    color:'black'
  },
  caption: {
    fontSize: wp('4%'),
    lineHeight: hp('2%'),
    paddingTop: hp('0.8%'),
    color:'gray'
  },
  infoText: {
    paddingTop:hp('2%'),
    fontSize:wp('5%'),
    alignSelf:'center'}
});