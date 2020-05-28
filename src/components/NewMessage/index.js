import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View,Text,Image,ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { reduxForm, Field } from 'redux-form';
import randomString from 'random-string'

import SearchTextInput from '../General/SearchTextInput'
import * as selectors from '../../reducers';
import * as searchActions from '../../actions/search';
import UserList from '../UserList';


function NewMessage({navigation, startFetchingSearchUsers, users}) {
  const [searchInput, setSerchInput] = useState("");
  useEffect(() => { 
    startFetchingSearchUsers(searchInput);
  },[searchInput]);
  return (
    <View style={styles.container}>
      <SearchTextInput onChange={setSerchInput} value={searchInput} placeholder={'Buscar personas'} multiline={true} />
      <UserList blockAction={true} navigation={navigation} userArray={users} container={{height: hp('80%')}}
        currentKey={'users'} infoEmptyText={''}
        recommendEmptyText={''} >
      </UserList>
    </View>
  );
}

export default connect(
  state => ({
    users: selectors.getSearchUsers(state),
  }),
  dispatch => ({
    startFetchingSearchUsers(search){
      dispatch(searchActions.startFetchingSearchUsers(search));
    },
  }),
)(NewMessage);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#fff',
   
  },
});