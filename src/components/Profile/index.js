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
import Tweet from '../Tweet';


function Profile({ navigation, startFetchingProfile, isFetchingProfile, SelectedUserId, profileInfo, profileMyTweets, profileLikedTweets }) {
  useEffect(startFetchingProfile,[SelectedUserId]);
  const refFlatList = React.useRef(null);
  const [toolBarOption, setToolBarOption] = useState(0);
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
                <TouchableOpacity onPress={()=> navigation.navigate('Followers')}>
                  <View style={{flexDirection:'row',height:hp('4%')}}>
                    <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{profileInfo.following} </Text>
                    <Text style={styles.caption}>Siguiendo </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Followers')}>
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
      {toolBarOption===0 && profileMyTweets.length > 0 &&
          <FlatList style={{margin:0,}}
          data={profileMyTweets}
          ref={refFlatList}
          key={"FlatListMyTweets"} 
          numColumns={1}
          keyExtractor={(tweet, index) => tweet.id}
          onEndReachedThreshold={0.1}
          refreshing={isFetchingProfile}
          onRefresh={()=>{startFetchingProfile()}}
          // onEndReached={()=> onLoadMore()}
          renderItem={(tweet) => (
            <View>
            <Tweet tweet={tweet.item} navigation={navigation}/>
            </View>
           )
          }
          />}

      {toolBarOption===1 && profileLikedTweets.length > 0 &&
          <FlatList style={{margin:0,}}
          data={profileLikedTweets}
          ref={refFlatList}
          key={"FlatListLikedTweets"} 
          numColumns={1}
          keyExtractor={(tweet, index) => tweet.id}
          onEndReachedThreshold={0.1}
          refreshing={isFetchingProfile}
          onRefresh={()=>{startFetchingProfile()}}
          // onEndReached={()=> onLoadMore()}
          renderItem={(tweet) => (
            <View>
            <Tweet tweet={tweet.item} navigation={navigation}/>
            </View>
           )
          }
          />}

        <FAB  onPress={()=>navigation.navigate('NewTweet')}
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
});