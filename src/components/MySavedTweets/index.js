/* -------------------------------------------------------------------------- */
/*                           Componente SavedTweets                           */
/* -------------------------------------------------------------------------- */
// Este componente contiene una lista de tweets y retweets guardados por el usuario. 

import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as tweetActions from '../../actions/tweets';
import TweetList from '../TweetList';





function SavedTweetsS({navigation,tweetsSaved,token,startFetchingSavedTweets,isFetchingSavedTweets,user}) {
  useEffect(startFetchingSavedTweets,[]);
  const refFlatList = React.useRef(null);
  return (
    <View style={styles.container}>
          
      <TweetList navigation={navigation} tweetArray={tweetsSaved} container={{height:hp('80%')}}
        key={'tweetsSaved'} infoEmptyText={'Todavía no has agregado ningún Tweet a tus Elementos guardados'} 
        recommendEmptyText={'Cuando lo hagas, se mostrarán aquí.'}
        isFetching={isFetchingSavedTweets}  onRefresh={()=>{startFetchingSavedTweets()}} >
      </TweetList>
      
      <FAB  onPress={()=>navigation.navigate('NewTweet')}
        buttonStyle={{marginTop: hp('80%'),}}
        icon={(<MaterialCommunityIcons name="feather" color={'white'} size={27} />)}
      />
    </View>
  );
}

export default connect(
  state => ({
    isFetchingSavedTweets: selectors.isFetchingSavedTweets(state),
    tweetsSaved: selectors.getSavedTweets(state),
    user: selectors.getAuthUser(state),
    token:selectors.getAuthToken(state),
   
  }),
  dispatch => ({
    startFetchingSavedTweets() {
      dispatch(tweetActions.startFetchingSavedTweets());
      
    },
  }),
)(SavedTweetsS);


const styles = StyleSheet.create({
  container: {
    height: hp('80%'),
  },
});