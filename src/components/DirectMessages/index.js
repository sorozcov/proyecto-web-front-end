import React,{useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, Image,FlatList,Text, TouchableOpacity ,Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FAB from '../General/FAB';
import * as selectors from '../../reducers';
import * as chatActions from '../../actions/chat';
import * as actionsProfile from '../../actions/profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



function DirectMessages({navigation,startFetchingChatUserMessages, isUserMessagesFetching, userMessages, selectProfileUserId, selectChatId}) {
  useEffect(startFetchingChatUserMessages,[]);
  const refFlatList = useRef(null);
  const isEmpty=(isFetching)=>{
    if(!isFetching){
      return(
        <View style={styles.infoContainer}>
          <Text style={styles.infoEmptyText}>{'Envía un mensaje, recibe un mensaje'}</Text>
          <Text style={styles.recommendText}>{'Los Mensajes Directos son conversaciones privadas entre tú y otras personas en Twitter'}</Text>
        </View>
      )
    }
    return null
  }
  return (
    <View style={styles.container}>
      <FlatList style={{margin:0,}}
        data={userMessages}
        ref={refFlatList}
        key={'userMessages'} 
        numColumns={1}
        keyExtractor={(message, index) => message.chat.toString()}
        onEndReachedThreshold={0.1}
        refreshing={isUserMessagesFetching}
        onRefresh={startFetchingChatUserMessages}
        // onEndReached={()=> onLoadMore()}
        renderItem={(message) => (
          <TouchableOpacity onPress={()=>selectChatId(navigation,{...message.item})}>
            <View style={styles.messageContainer}>
              <View style={styles.flexRow}>
                <TouchableOpacity onPress={()=>selectProfileUserId(navigation,message.item.userid)}>
                  <View style={styles.imageContainer} >
                      <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
                  </View>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <View style={styles.flexRow}>
                    <View style={styles.titleInfo}>
                      <Text numberOfLines={1} style={styles.userNameStyle}>{message.item.first_name}</Text>
                      <Text numberOfLines={1}  style={styles.infoUserNameStyle}> @{message.item.username}  · </Text>
                      <TimeAgo style={styles.infoUserNameStyle} time={message.item.date} hideAgo={true} interval={300}/>
                    </View>
                  </View>
                  <Text style={styles.messageStyle}>{message.item.content}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          )
        }
        ListEmptyComponent={isEmpty(isUserMessagesFetching)}
        /> 

      <FAB  onPress={()=>navigation.navigate('NewMessage')}
        icon={(<MaterialCommunityIcons name="email-plus-outline" color={'white'} size={23} />)}
      />
    </View>
  );
}

export default connect(
  state => ({
    isUserMessagesFetching: selectors.isUserMessagesFetching(state),
    userMessages: selectors.getUserMessages(state),   
  }),
  dispatch => ({
    startFetchingChatUserMessages() {
      dispatch(chatActions.startFetchingChatUserMessages());
    },
    selectProfileUserId(navigation, userId){         
      dispatch(actionsProfile.setSelectedProfileUserId(userId));
      navigation.navigate('Profile');
    },
    selectChatId(navigation, {chat, first_name, username, userid}){
      dispatch(chatActions.clearChatMessages());
      dispatch(chatActions.selectChatUserMessage({chat, first_name, username, userid}));         
      navigation.navigate('Chat');
    },
  }),
)(DirectMessages);


const styles = StyleSheet.create({
  container: {
    height: hp('80%'),
  },
  messageContainer: {
    width:wp('100%'),
    backgroundColor:'white',
    borderBottomColor:'#EAEAEA',
    borderBottomWidth:0.5,
    flexDirection:'column'
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