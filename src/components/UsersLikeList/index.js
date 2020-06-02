/* -------------------------------------------------------------------------- */
/*                          Componente UsersLikeList                          */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de usuarios que le han dado like a un tweet.

import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as selectors from '../../reducers';
import * as actionsProfile from '../../actions/profile';
import * as tweetSelectedActions from '../../actions/tweetSelected';
import UserList from '../UserList';


function UserLikes({navigation,tweetSelected,userLikes,startFetchingLikeUsers,isFetchingUserLikes, selectProfileUserId}) {
  useEffect(startFetchingLikeUsers,[]);
  const refFlatList = React.useRef(null);
  return (
    <View style={styles.container}>
      
      <View style={{margin:0,height:hp('95%')}}>
      <UserList otherAction={true} navigation={navigation} userArray={userLikes} container={{height: hp('80%')}}
          currentKey={'UserLikes'} 
          isFetching={isFetchingUserLikes}  onRefresh={()=>{startFetchingLikeUsers()}} action={({id})=> selectProfileUserId(navigation,id)}>
        </UserList>
      </View>
     
    </View>
  );
}

export default connect(
  state => ({
    isFetchingUserLikes: selectors.isTweetFetchingLikeUsers(state),
    userLikes: selectors.getLikeUsers(state),
    tweetSelected:selectors.getTweetInfo(state),

   
  }),
  dispatch => ({
    startFetchingLikeUsers() {
      dispatch(tweetSelectedActions.startFetchingTweetLikeUsers());
    },
    selectProfileUserId(navigation, userId){
      dispatch(actionsProfile.setSelectedProfileUserId(userId));
      navigation.navigate('Profile');
    }

  }),
)(UserLikes);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});