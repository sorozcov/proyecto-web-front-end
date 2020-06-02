/* -------------------------------------------------------------------------- */
/*                            Componente TweetList                            */
/* -------------------------------------------------------------------------- */
// Este componente contiene un flatlist que contiene el array de tweets y los despliega.

import React from 'react';
import { StyleSheet, View, FlatList, Text  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Tweet from '../Tweet';


export default function TweetList({ navigation, container={}, infoContainer={}, infoEmptyTextStyle={},recommendEmptyTextStyle={}, viewCondition=true, tweetArray=[], currentKey='', isFetching, onRefresh, infoEmptyText="",iconEmpty=null,recommendEmptyText='' }) {
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
        data={tweetArray}
        ref={refFlatList}
        key={currentKey} 
        numColumns={1}
        keyExtractor={(tweet, index) => tweet.id}
        onEndReachedThreshold={0.1}
        refreshing={isFetching}
        onRefresh={onRefresh}
        // onEndReached={()=> onLoadMore()}
        renderItem={(tweet) => (
          <View>
          <Tweet tweet={tweet.item} navigation={navigation}/>
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