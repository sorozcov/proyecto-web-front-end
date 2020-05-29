import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View,Text,Image,ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { reduxForm, Field } from 'redux-form';
import randomString from 'random-string'

import SearchTextInput from '../General/SearchTextInput'
import * as selectors from '../../reducers';
import * as searchActions from '../../actions/search';
import * as chatActions from '../../actions/chat';
import UserList from '../UserList';


function NewMessage({navigation, clearSearchUsers, startFetchingSearchUsers, users, isSearchUsersFetching, getUserMessageInfoBySelectedUser, clearChatMessages}) {
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => { 
    if(searchInput === '')
      clearSearchUsers();
    else
      startFetchingSearchUsers(searchInput);
  },[searchInput]);
  return (
    <View style={styles.container}>
      <SearchTextInput onChange={setSearchInput} value={searchInput} placeholder={'Buscar personas'} multiline={false} />
      <UserList otherAction={true} navigation={navigation} userArray={users} container={{height: hp('80%')}}
        currentKey={'users'} infoEmptyText={''} isFetching={isSearchUsersFetching} action={({id, first_name, username})=> {
          const userMessage = getUserMessageInfoBySelectedUser(id);
          if(userMessage.length > 0){
            navigation.navigate('Chat',{ ...(userMessage[0]) });
          } else {
            clearChatMessages();
            navigation.navigate('Chat',{ chatId: null, first_name, username, userid: id });
          }
        }}
        recommendEmptyText={''} >
      </UserList>
    </View>
  );
}

export default connect(
  state => ({
    users: selectors.getSearchUsers(state),
    isSearchUsersFetching: selectors.isSearchUsersFetching(state),
    getUserMessageInfoBySelectedUser(userId) { 
      return selectors.getUserMessageInfoBySelectedUser(state,userId) 
    },
  }),
  dispatch => ({
    startFetchingSearchUsers(search){
      dispatch(searchActions.startFetchingSearchUsers(search));
    },
    clearSearchUsers(){
      dispatch(searchActions.clearSearchUsers());
    },
    clearChatMessages(){
      dispatch(chatActions.clearChatMessages());
    },
  }),
)(NewMessage);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#fff',
   
  },
});