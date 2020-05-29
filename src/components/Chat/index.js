import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import { StyleSheet, View, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import randomString from 'random-string';

import ChatTextInput from '../General/ChatTextInput'
import * as selectors from '../../reducers';
import * as chatActions from '../../actions/chat';
import * as actionsProfile from '../../actions/profile';


function Chat({navigation, route, startFetchingChatMessages, messages, isChatMessagesFetching, selectProfileUserId, sendMessage}) {
  const chatId = parseInt(JSON.stringify(route.params.chat));
  const userId = parseInt(JSON.stringify(route.params.userid));
  const first_name = JSON.stringify(route.params.first_name).replace(/["']/g, "");
  const username = JSON.stringify(route.params.username).replace(/["']/g, "");
  const [chatInput, setchatInput] = useState("");
  const refFlatList = useRef(null);
  useEffect(() => {
    if(!isNaN(chatId)) {
      startFetchingChatMessages(chatId);
      const timer = setInterval(() => startFetchingChatMessages(chatId), 5000);
      return () => clearInterval(timer);
    }
  },[]);
  if(first_name!==null)
    navigation.setOptions({ headerTitle: first_name });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} 
      keyboardVerticalOffset={hp('12%')} >
      <SafeAreaView  style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.chatTextStyle}>
            <ChatTextInput onChange={setchatInput} value={chatInput} placeholder={'Escribe un mensaje'} multiline={false} send={() => {
              sendMessage(chatId, chatInput, username, userId, first_name);
              setchatInput('');
              }}/>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList style={{margin:0,}}
            data={messages}
            ref={refFlatList}
            key={'messages'} 
            inverted={true}
            numColumns={1}
            keyExtractor={message => message.id.toString()}
            onEndReachedThreshold={0.1}
            refreshing={isChatMessagesFetching}
            //onRefresh={() => startFetchingChatMessages(chatId)}
            // onEndReached={()=> onLoadMore()}
            renderItem={(message) => (
              <View style={{...styles.messageContainer,alignItems:message.item.sender.is_me ? 'flex-end' : 'flex-start'}}>
                <View style={styles.flexRow}>
                  { !message.item.sender.is_me &&
                    <TouchableOpacity onPress={()=>selectProfileUserId(navigation,message.item.sender.id)}>
                      <View style={styles.imageContainer} >
                          <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
                      </View>
                    </TouchableOpacity>
                  }
                  <View style={{...styles.contentContainer,backgroundColor:message.item.sender.is_me ? '#00ACEE' : '#EAEAEA',     
                    borderBottomLeftRadius:message.item.sender.is_me ? wp('2%') : wp('0%'), borderBottomRightRadius:message.item.sender.is_me ? wp('0%') : wp('2%')}}>
                    <Text style={{...styles.messageStyle,color:message.item.sender.is_me ? 'white' : 'black'}}>{message.item.content}</Text>
                  </View>
                </View>
                <View style={styles.flexRow}>
                  <TimeAgo style={{...styles.messageStyle,paddingTop:hp('1%'),marginLeft:wp('15%')}} time={message.item.date} hideAgo={true} interval={300}/>
                  <Text style={{...styles.messageStyle,paddingTop:hp('1%'),marginRight:wp('4%')}} >{', ' + moment(message.item.date).format("hh:mm a")}</Text>
                </View>
              </View>
              )
            }
            /> 
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default connect(
  state => ({
    messages: selectors.getChatMessages(state),
    isChatMessagesFetching: selectors.isChatMessagesFetching(state),
  }),
  dispatch => ({
    startFetchingChatMessages(chatId){
      if(!isNaN(chatId))
        dispatch(chatActions.startFetchingChatMessages(chatId));
    },
    selectProfileUserId(navigation, userId){         
      dispatch(actionsProfile.setSelectedProfileUserId(userId));
      navigation.navigate('Profile');
    },
    sendMessage(chatId, chatInput, username, userid, first_name){         
      const content = chatInput.trim().replace( /[\r\n]+/gm, " " )
      if(content!==""){
        const date = new Date();
        if(!isNaN(chatId)){
          dispatch(chatActions.updateChatUserMessage(({ chat: chatId, content, date, username, userid, first_name })));
          const id = randomString();
          dispatch(chatActions.startAddingChatMessage(({ id, date, content, chat:chatId, sender:{ is_me:true } })));
        } else{
          chatId = randomString();
          dispatch(chatActions.startAddingChatUsersMessages(({ chat: chatId, content, date, username, userid, first_name })));
        }
      }
    },
  }),
)(Chat);


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  inner: {
    flex:1,
    flexDirection:'column-reverse',
  },
  chatTextStyle: {
    width: hp('100%'),
  },
  messageContainer: {
    width:wp('100%'),
    paddingBottom:wp('4%'),
    backgroundColor:'white',
    flexDirection:'column'
  },
  flexRow:{
      flexDirection:'row',
  },
  imageContainer:{
      width:wp('15%')
  },
  imageProfile:{
    borderRadius:hp('50%'),
    height:hp('5%'),
    width:hp('5%'),
    margin:wp('2%'),
    marginRight:wp('0.5%'),
  },
  messageStyle:{
    color:'gray',
    fontSize:15,
  },
  titleContainer:{
      width:wp('85%')
  },
  contentContainer: {
    borderRadius:wp('2%'),
    width:wp('60%'),
    padding:wp('2%'),
    marginRight:wp('3%'),
  },
});