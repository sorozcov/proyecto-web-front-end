/* -------------------------------------------------------------------------- */
/*                             Componente UserList                            */
/* -------------------------------------------------------------------------- */
// Este componente contiene un flatlist que muestra la información de un array usuarios.

import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import User from '../User';

export default function UserList({ navigation, container={}, infoContainer={},infoEmptyTextStyle={},recommendEmptyTextStyle={}, viewCondition=true, userArray=[], currentKey='', isFetching, onRefresh, infoEmptyText="",iconEmpty=null,recommendEmptyText='' ,otherAction=false, action=null }) {
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
          otherAction 
          ? <TouchableOpacity onPress={()=> action(user.item)}>
              <View>
                <User navigation={navigation} otherAction={otherAction} action={() => action(user.item)} user={ user.item } ></User>
              </View>
            </TouchableOpacity>
          : <View>
              <User navigation={navigation} otherAction={otherAction} user={ user.item } ></User>
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