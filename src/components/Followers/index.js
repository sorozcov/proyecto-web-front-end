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


function Followers({ navigation, route, isFetchingProfile, startFetchingProfileFollowers, startFetchingProfileFollowing, SelectedUserId, profileInfo, profileFollowers, profileFollowing }) {
  const refFlatList = React.useRef(null);
  const option = JSON.stringify(route.params.itemId);
  const [toolBarOption, setToolBarOption] = useState(parseInt(option));
  useEffect(() => {
    if(toolBarOption===1)
      startFetchingProfileFollowers();
  },[SelectedUserId,toolBarOption]);
  useEffect(() => {
    if(toolBarOption===0)
      startFetchingProfileFollowing();
  },[SelectedUserId,toolBarOption]);
  if(profileInfo!==null)
    navigation.setOptions({ headerTitle: profileInfo.first_name + " "+ profileInfo.last_name });
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',height:hp('7%')}}>
        <ButtonOption options={['Siguiendo','Seguidores']}  onPressVar={toolBarOption} onPressAction={setToolBarOption} />
      </View>
      {toolBarOption===1 && profileFollowers.length > 0 &&
          <FlatList style={{margin:0,}}
          data={profileFollowers}
          ref={refFlatList}
          key={"FlatListFollowers"} 
          numColumns={1}
          keyExtractor={(user, index) => user.id}
          onEndReachedThreshold={0.1}
          refreshing={isFetchingProfile}
          onRefresh={()=>{startFetchingProfileFollowers()}}
          // onEndReached={()=> onLoadMore()}
          renderItem={(user) => (
            <View>
            <User navigation={navigation} user={user.item.userFollower} ></User>
            </View>
           )
          }
          />}

      {toolBarOption===0 && profileFollowing.length > 0 &&
          <FlatList style={{margin:0,}}
          data={profileFollowing}
          ref={refFlatList}
          key={"FlatListFollowing"} 
          numColumns={1}
          keyExtractor={(user, index) => user.id}
          onEndReachedThreshold={0.1}
          refreshing={isFetchingProfile}
          onRefresh={()=>{startFetchingProfileFollowing()}}
          // onEndReached={()=> onLoadMore()}
          renderItem={(user) => (
            <View>
            <User navigation={navigation} user={user.item.userFollowing} ></User>
            </View>
           )
          }
          />}

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