import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image,FlatList,Text, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
var moment = require('moment');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

import * as selectors from '../../reducers';
import * as profileActions from '../../actions/profile';
import ButtonOption from '../General/ButtonOption';
import Tweet from '../Tweet';


function Followers({ navigation, isFetchingProfile, startFetchingProfile, SelectedUserId, profileInfo, profileFollowers, profileFollowing }) {
  useEffect(startFetchingProfile,[SelectedUserId]);
  const refFlatList = React.useRef(null);
  const [toolBarOption, setToolBarOption] = useState(0);
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
          onRefresh={()=>{startFetchingProfile()}}
          // onEndReached={()=> onLoadMore()}
          renderItem={(user) => (
            <View>
            <Text>Hola</Text>
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
          onRefresh={()=>{startFetchingProfile()}}
          // onEndReached={()=> onLoadMore()}
          renderItem={(user) => (
            <View>
            <Text>Hola</Text>
            </View>
           )
          }
          />}

      <FAB 
        icon={(<MaterialCommunityIcons name="feather" color={'white'} size={27} />)}
        />
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
    startFetchingProfile() {
      dispatch(profileActions.startFetchingProfileFollowers());      
    },
  }),
)(Followers);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});