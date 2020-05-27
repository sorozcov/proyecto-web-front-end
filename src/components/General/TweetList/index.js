import React from 'react';

import { StyleSheet, View, FlatList, Text  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tweet from '../../Tweet';


export default function TweetList({ navigation, container={}, infoContainer={}, infoTextStyle={}, viewCondition=true, tweetArray=[], currentKey='', isFetching, onRefresh, infoText="" }) {
  const refFlatList = React.useRef(null);
  return (
    <View style={{...styles.container,...container}}>
      
      {tweetArray.length > 0 ?
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
          /> :
          <View style={{...styles.infoContainer,...infoContainer}}>
                  <MaterialCommunityIcons name="information" color='black' size={wp('10%')} />
                  <Text style={{...styles.infoText,...infoTextStyle}}>{infoText}</Text>
          </View>}
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