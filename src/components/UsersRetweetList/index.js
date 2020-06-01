import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, Image,FlatList,Text, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as tweetActions from '../../actions/tweets';
import * as tweetSelectedActions from '../../actions/tweetSelected';
import UserList from '../UserList';




function UserLikes({navigation,tweetSelected,userRetweets,startFetchingRetweetUsers,isFetchingUserRetweets}) {
  useEffect(startFetchingRetweetUsers,[]);
  const refFlatList = React.useRef(null);
  return (
    <View style={styles.container}>
      
      <View style={{margin:0,height:hp('95%')}}>
      <UserList navigation={navigation} userArray={userRetweets} container={{height: hp('80%')}}
          currentKey={'RetweetLikes'} 
          isFetching={isFetchingUserRetweets}  onRefresh={()=>{startFetchingRetweetUsers()}}>
        </UserList>
      </View>
     
    </View>
  );
}

export default connect(
  state => ({
    isFetchingUserRetweets: selectors.isTweetFetchingRetwetUsers(state),
    userRetweets: selectors.getRetweetUsers(state),
    tweetSelected:selectors.getTweetInfo(state),

   
  }),
  dispatch => ({
    startFetchingLikeUsers() {
      dispatch(tweetSelectedActions.startFetchingTweetLikeUsers());
      
    },
    startFetchingRetweetUsers() {
      dispatch(tweetSelectedActions.startFetchingTweetRetweetUsers());
      
    },
  }),
)(UserLikes);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});