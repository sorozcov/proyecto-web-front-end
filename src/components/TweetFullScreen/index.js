import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, Image,FlatList,Text, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as tweetActions from '../../actions/tweets';
import * as tweetSelectedActions from '../../actions/tweetSelected';
import TweetList from '../TweetList';
import TweetFull from '../TweetFull'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from '../Comment'



function HomeFeed({navigation,tweetSelected,comments,startFetchingCommentsTweets,isFetchingComments}) {
  useEffect(startFetchingCommentsTweets,[]);
  const refFlatList = React.useRef(null);
  return (
    <View style={styles.container}>
      <TweetFull tweet={tweetSelected} navigation={navigation}/>
      <View style={{margin:0,height:hp('68%')}}>
      <FlatList style={{margin:0}}
        data={comments}
        ref={refFlatList}
        key={'CommentList'} 
        numColumns={1}
        keyExtractor={(comment, index) => String(comment.id)}
        onEndReachedThreshold={0.1}
        refreshing={isFetchingComments}
        onRefresh={startFetchingCommentsTweets}
        // onEndReached={()=> onLoadMore()}
        renderItem={(comment) => (
          
          <Comment comment={comment.item}/>
          
          )
        }
        
        /> 
      </View>
     
    </View>
  );
}

export default connect(
  state => ({
    isFetchingComments: selectors.isTweetFetchingComments(state),
    comments:selectors.getTweetComments(state),
    tweetsHome: selectors.getTweets(state),
    tweetSelected:selectors.getTweetInfo(state),

   
  }),
  dispatch => ({
    startFetchingTweetsHome() {
      dispatch(tweetActions.startFetchingTweetsHome());
      
    },
    startFetchingCommentsTweets() {
      dispatch(tweetSelectedActions.startFetchingTweetComments());
      
    },
    startFetchingLikeUsers() {
      dispatch(tweetSelectedActions.startFetchingTweetLikeUsers());
      
    },
    startFetchingRetweetUsers() {
      dispatch(tweetSelectedActions.startFetchingRetweetUsers());
      
    },
  }),
)(HomeFeed);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});