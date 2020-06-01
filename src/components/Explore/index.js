import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View,Text,Image,ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import SearchTextInput from '../General/SearchTextInput'
import * as selectors from '../../reducers';
import * as searchActions from '../../actions/search';
import * as actionsProfile from '../../actions/profile';
import UserList from '../UserList';
import ButtonOption from '../General/ButtonOption';
import TweetList from '../TweetList';

function Explore({navigation, clearSearchUsers, startFetchingSearchUsers, clearSearchTweets, startFetchingSearchTweets, users, isSearchUsersFetching, tweets, isSearchTweetsFetching, selectProfileUserId}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTweet, setSearchInputTweet] = useState("");
  const [toolBarOption, setToolBarOption] = useState(0);
  useEffect(() => {
    if(toolBarOption===0)
      if(searchInput === '')
        clearSearchUsers();
      else
        startFetchingSearchUsers(searchInput);
    if(toolBarOption===1)
      if(searchInputTweet === '')
        clearSearchTweets();
      else
        startFetchingSearchTweets(searchInputTweet);
  },[searchInput, searchInputTweet, toolBarOption]);
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',height:hp('7%')}}>
        <ButtonOption options={['Usuarios','Tweets']}  onPressVar={toolBarOption} onPressAction={setToolBarOption} />
      </View>

      {toolBarOption===0 && 
        <>
          <SearchTextInput onChange={setSearchInput} value={searchInput} placeholder={'Buscar personas'} multiline={false} />
          <UserList otherAction={true} navigation={navigation} userArray={users} container={{height:Platform.OS === 'ios' ? hp('68%') : hp('70%') }}
            currentKey={'users'} infoEmptyText={''} isFetching={isSearchUsersFetching} action={({id})=> selectProfileUserId(navigation,id)}
            recommendEmptyText={''} >
          </UserList>
        </>
      }

      {toolBarOption===1 && 
      <>
        <SearchTextInput onChange={setSearchInputTweet} value={searchInputTweet} placeholder={'Buscar tweets'} multiline={false} />
        <TweetList navigation={navigation} tweetArray={tweets} container={{height:Platform.OS === 'ios' ? hp('68%') : hp('70%') }}
          key={'tweets'} infoEmptyText={''} 
          recommendEmptyText={''}
          isFetching={isSearchTweetsFetching}  onRefresh={null} >
        </TweetList>
      </>
      }
    </View>
  );
}

export default connect(
  state => ({
    users: selectors.getSearchUsers(state),
    isSearchUsersFetching: selectors.isSearchUsersFetching(state),
    tweets: selectors.getSearchTweets(state),
    isSearchTweetsFetching: selectors.isSearchTweetsFetching(state),
  }),
  dispatch => ({
    startFetchingSearchUsers(search){
      dispatch(searchActions.startFetchingSearchUsers(search));
    },
    clearSearchUsers(){
      dispatch(searchActions.clearSearchUsers());
    },
    startFetchingSearchTweets(search){
      dispatch(searchActions.startFetchingSearchTweets(search));
    },
    clearSearchTweets(){
      dispatch(searchActions.clearSearchTweets());
    },
    selectProfileUserId(navigation, userId){
      dispatch(actionsProfile.setSelectedProfileUserId(userId));
      navigation.navigate('Profile');
    }
  }),
)(Explore);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#fff',
   
  },
});