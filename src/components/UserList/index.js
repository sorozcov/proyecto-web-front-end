import React from 'react';

import { StyleSheet, View, FlatList, Text  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import User from '../User';


export default function UserList({ navigation, container={}, infoContainer={},infoEmptyTextStyle={},recommendEmptyTextStyle={}, viewCondition=true, userArray=[], currentKey='', isFetching, onRefresh, infoEmptyText="",iconEmpty=null,recommendEmptyText='' ,blockAction=false }) {
  const refFlatList = React.useRef(null);
  const isEmpty=(isFetching)=>{
    if(!isFetching){
      return(
        <View style={{...styles.infoContainer,...infoContainer}}>
          {iconEmpty!=null && iconEmpty}
          <Text style={{...styles.infoEmptyText,...infoEmptyTextStyle}}>{infoEmptyText}</Text>
          <Text style={{...styles.recommendText,...recommendEmptyTextStyle}}>{recommendEmptyText}</Text>
        </View>
      )
    }
    return null
  }
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
          <User navigation={navigation} blockAction={blockAction} user={ user.item } ></User>
          </View>
          )
        }
        ListEmptyComponent={isEmpty(isFetching)}
        
        />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  infoContainer: {
    height:hp('50%'),
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  infoEmptyText: {
    paddingTop:hp('2%'),
    fontSize:wp('6.5%'),
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    fontWeight:'bold',
    textAlign:'center',
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
  },
  recommendText: {
    paddingTop:hp('1%'),
    fontSize:wp('4.8%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    textAlign:'center',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    color:'gray',
  
  },
});