/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene una lista de tweets y retweets y muestra al usuario todos los
// tweets de los usuarios que sigue.

import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as tweetActions from '../../actions/tweets';
import TweetList from '../TweetList';



function HomeFeed({navigation,tweetsHome,token,startFetchingTweetsHome,isFetchingHomeTweets,user}) {
  useEffect(startFetchingTweetsHome,[]);
 
  const refFlatList = React.useRef(null);
  return (
    <View style={styles.container}>
          
      <TweetList navigation={navigation} tweetArray={tweetsHome} container={{height:Platform.OS === 'ios' ? hp('80%') : hp('83.8%') }}
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
    height: hp('100%'),
  },
});