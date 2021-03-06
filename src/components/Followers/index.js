/* -------------------------------------------------------------------------- */
/*                            Componente Followers                            */
/* -------------------------------------------------------------------------- */
// Este componente contiene las lista de usuarios que sigue el usuario y la lista de usuarios que
// siguen al usuario.

import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as selectors from '../../reducers';
import * as profileActions from '../../actions/profile';
import ButtonOption from '../General/ButtonOption';
import UserList from '../UserList';


function Followers({ navigation, route, isFetchingProfile, startFetchingProfileFollowers, startFetchingProfileFollowing, SelectedUserId, profileInfo, profileFollowers, profileFollowing, selectProfileUserId }) {
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
        <UserList otherAction={true} navigation={navigation} userArray={profileFollowers} container={{height: hp('80%')}}
          currentKey={'profileFollowers'} infoEmptyText={'Todavía no tienes seguidores'}
          recommendEmptyText={'Cuando alguien te siga, lo verás aquí.'}
          isFetching={isFetchingProfile}  onRefresh={()=>{startFetchingProfileFollowers()}} action={({id})=> selectProfileUserId(navigation,id)}>
        </UserList>
      }

      {toolBarOption===0 && 
        <UserList otherAction={true} navigation={navigation} userArray={profileFollowing} 
          currentKey={'profileFollowing'}   container={{height: hp('80%')}}
          infoEmptyText={'Todavía no sigues a nadie'}
          recommendEmptyText={'Cuando lo hagas, estos usuarios se detallarán aquí y veras sus Tweets en tu cronología.'}
          isFetching={isFetchingProfile}  onRefresh={()=>{startFetchingProfileFollowing()}} action={({id})=> selectProfileUserId(navigation,id)}>
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
    selectProfileUserId(navigation, userId){
      dispatch(profileActions.setSelectedProfileUserId(userId));
      navigation.navigate('Profile');
    },
  }),
)(Followers);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});