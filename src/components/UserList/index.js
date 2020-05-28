import React from 'react';

import { StyleSheet, View, FlatList, Text  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import User from '../User';


export default function UserList({ navigation, container={}, infoContainer={}, infoTextStyle={}, viewCondition=true, userArray=[], currentKey='', isFetching, onRefresh, infoText="", userType="" }) {
  const refFlatList = React.useRef(null);
  return (
    <View style={{...styles.container,...container}}>
      <FlatList style={{margin:0,}}
        data={userArray}
        ref={refFlatList}
        key={currentKey} 
        numColumns={1}
        keyExtractor={(user, index) => user.id.toString()}
        onEndReachedThreshold={0.1}
        refreshing={isFetching}
        onRefresh={onRefresh}
        // onEndReached={()=> onLoadMore()}
        renderItem={(user) => (
          <View>
          <User navigation={navigation} user={userType === 'Followers' ? user.item.userFollower : userType === 'Following' ? user.item.userFollowing : user.item } ></User>
          </View>
          )
        }
        />
      {userArray.length === 0 && !isFetching &&
        <View style={{...styles.infoContainer,...infoContainer}}>
          <MaterialCommunityIcons name="information" color='black' size={wp('10%')} />
          <Text style={{...styles.infoText,...infoTextStyle}}>{infoText}</Text>
        </View>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  infoContainer: {
    height:hp('20%'),
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  infoText: {
    paddingTop:hp('2%'),
    fontSize:wp('5%'),
    alignSelf:'center'}
});