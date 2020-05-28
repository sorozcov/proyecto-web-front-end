import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, Image,FlatList,Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as tweetActions from '../../actions/tweets';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



function DirectMessages({navigation,tweetsHome,token,startFetchingTweetsHome,isFetchingHomeTweets,user}) {
  return (
    <View style={styles.container}>
      
      <FAB  onPress={()=>navigation.navigate('NewMessage')}
        icon={(<MaterialCommunityIcons name="email-plus-outline" color={'white'} size={23} />)}
      />
    </View>
  );
}

export default connect(
  state => ({
    isFetchingHomeTweets: selectors.isFetchingTweets(state),
    tweetsHome: selectors.getTweets(state),
    user: selectors.getAuthUser(state),
    token:selectors.getAuthToken(state),
   
  }),
  dispatch => ({
    startFetchingTweetsHome() {
      dispatch(tweetActions.startFetchingTweetsHome());
      
    },
  }),
)(DirectMessages);


const styles = StyleSheet.create({
  container: {
    height: hp('80%'),
  },
});