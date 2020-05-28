import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image,FlatList,Text, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var moment = require('moment');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

import * as selectors from '../../reducers';
import * as profileActions from '../../actions/profile';
import ButtonOption from '../General/ButtonOption';
import User from '../User';
import UserList from '../UserList';


function Followers({ navigation, route, isFetchingProfile, startFetchingProfileFollowers, startFetchingProfileFollowing, SelectedUserId, profileInfo, profileFollowers, profileFollowing }) {
  const option = JSON.stringify(route.params.itemId);
  const [toolBarOption, setToolBarOption] = useState(parseInt(option));
  useEffect(() => {
    if(toolBarOption===0)
      startFetchingProfileFollowing();
    if(toolBarOption===1)
      startFetchingProfileFollowers();
  },[SelectedUserId,toolBarOption]);
  if(profileInfo!==null)
    navigation.setOptions({ headerTitle: profileInfo.first_name + " "+ profileInfo.last_name });
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',height:hp('7%')}}>
        <ButtonOption options={['Siguiendo','Seguidores']}  onPressVar={toolBarOption} onPressAction={setToolBarOption} />
      </View>
      
      {toolBarOption===1 && 
        <UserList navigation={navigation} userArray={profileFollowers} container={{height: hp('80%')}}
          key={'profileFollowers'} infoText={'Aún no tiene seguidores'} userType={'Followers'}
          isFetching={isFetchingProfile}  onRefresh={()=>{startFetchingProfileFollowers()}} >
        </UserList>
      }

      {toolBarOption===0 && 
        <UserList navigation={navigation} userArray={profileFollowing} container={{height: hp('80%')}}
          key={'profileFollowing'} infoText={'Aún no sigue a ningún usuario'} userType={'Following'}
          isFetching={isFetchingProfile}  onRefresh={()=>{startFetchingProfileFollowing()}} >
        </UserList>
      }
    </View>
  );
}

export default connect(
  state => ({
    SelectedUserId: selectors.getProfileSelectedUserId(state),
    profileInfo: selectors.getProfileInfo(state),
    profileFollowers: selectors.getProfileFollowers(state),
    profileFollowing: selectors.getProfileFollowings(state),
    isFetchingProfile: selectors.isProfileFetching(state),
  }),
  dispatch => ({
    startFetchingProfileFollowers() {
      dispatch(profileActions.startFetchingProfileFollowers());      
    },
    startFetchingProfileFollowing() {
      dispatch(profileActions.startFetchingProfileFollowing());      
    },
  }),
)(Followers);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});