/* -------------------------------------------------------------------------- */
/*                        Componente NotificationsList                        */
/* -------------------------------------------------------------------------- */
// Este componente contiene un flatlist dque despliega una lista de notificaciones con su información respectiva.

import React from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as actionsProfile from '../../actions/profile';
import * as actionsTweetSelected from '../../actions/tweetSelected';

function NotificationsList({ navigation, container={}, infoContainer={},infoEmptyTextStyle={},recommendEmptyTextStyle={}, viewCondition=true, userArray=[], currentKey='', isFetching, onRefresh, infoEmptyText="",iconEmpty=null,recommendEmptyText='' , selectProfileUserId, infoText='',selectTweetInfo }) {
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
        keyExtractor={(notification, index) => notification.id.toString()}
        onEndReachedThreshold={0.1}
        refreshing={isFetching}
        onRefresh={onRefresh}
        // onEndReached={()=> onLoadMore()}
        renderItem={(notification) => (
           <TouchableOpacity onPress={()=>  
           notification.item.originalTweet===undefined ? selectTweetInfo(notification.item.tweet.id,
           tweet={data:notification.item.tweet,...notification.item.tweet,itemType:'tweet',id:'tweet-'+notification.item.tweet.id,isConfirmed:true}
           ,navigation) : selectTweetInfo(notification.item.originalTweet.id,
            originalTweet={data:notification.item.originalTweet,...notification.item.originalTweet,itemType:'tweet',id:'tweet-'+notification.item.originalTweet.id,isConfirmed:true}
            ,navigation)}>
            <View style={styles.notificationContainer}>
              <View style={styles.flexRow}>
                <TouchableOpacity onPress={()=>selectProfileUserId(navigation,notification.item.user.id)}>
                  <View style={styles.imageContainer} >
                      <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
                  </View>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <View style={styles.flexRow}>
                    <View style={styles.titleInfo}>
                      <Text numberOfLines={1} style={styles.userNameStyle}>{notification.item.user.first_name}</Text>
                      <Text numberOfLines={1}  style={styles.infoUserNameStyle}> @{notification.item.user.username}</Text>
                    </View>
                  </View>
                  <Text style={styles.messageStyle}>{infoText}
                    <TimeAgo style={styles.infoUserNameStyle} time={notification.item.date} hideAgo={true} interval={300}/>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          )
        }
        ListEmptyComponent={isEmpty(isFetching)}
        
        />
    </View>
  );
}

export default connect(
  undefined,
  dispatch => ({
    selectProfileUserId(navigation, userId){         
      dispatch(actionsProfile.setSelectedProfileUserId(userId));
      navigation.navigate('Profile');
    },
    selectTweetInfo(id,tweet,navigation){
      dispatch(actionsTweetSelected.setSelectedTweetId(id,tweet))
      navigation.navigate('TweetFullScreen')
  },
  }),
)(NotificationsList);

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
  
  notificationContainer: {
    width:wp('100%'),
    backgroundColor:'white',
    borderBottomColor:'#EAEAEA',
    borderBottomWidth:0.5,
    flexDirection:'column'
  },
  flexRow:{
      flexDirection:'row',
  },
  imageContainer:{
      width:wp('20%')
  },
  imageProfile:{
    borderRadius:hp('50%'),
    height:Platform.OS=='ios'?hp('6%'):hp('8%'),
    width:Platform.OS=='ios'?hp('6%'):hp('8%'),
    margin:wp('2%'),
    marginRight:wp('0.5%'),
},
  titleInfo:{
      width:wp('35%'),
      flexDirection:'row',
  },
  userNameStyle:{
      marginTop:wp('2.4%'),
      fontSize:15,
      fontWeight:'bold',
  },
  infoUserNameStyle:{
      marginTop:wp('2.4%'),
      color:'gray',
      paddingLeft:wp('1%'),
      fontSize:15
  },
  messageStyle:{
      color:'gray',
      paddingLeft:wp('1%'),
      paddingBottom:wp('3%'),
      width:wp('75%'),
      fontSize:15
  },
  titleContainer:{
      width:wp('85%')
  },
});