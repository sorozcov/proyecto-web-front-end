import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, Image,FlatList,Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as tweetActions from '../../actions/tweets';
import TweetList from '../TweetList';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tweet from '../Tweet'



function HomeFeed({navigation,tweetsHome,token,startFetchingTweetsHome,isFetchingHomeTweets,user}) {
  useEffect(startFetchingTweetsHome,[]);
  const refFlatList = React.useRef(null);
  
  console.log(token);
  return (
    <View style={styles.container}>
          
      <TweetList navigation={navigation} tweetArray={tweetsHome} container={{height:hp('80%')}}
        key={'tweetsHome'} infoEmptyText={'¿Qué?¿Todavía no ves Tweets?'} 
        recommendEmptyText={'Esta cronología no estará vacía para siempre. Comienza a seguir personas y sus tweets estarán aquí.'}
        isFetching={isFetchingHomeTweets}  onRefresh={()=>{startFetchingTweetsHome()}} >
      </TweetList>
      
      <FAB  onPress={()=>navigation.navigate('NewTweet')}
        icon={(<MaterialCommunityIcons name="feather" color={'white'} size={27} />)}
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
)(HomeFeed);


const styles = StyleSheet.create({
  container: {
    height: hp('80%'),
  },
});