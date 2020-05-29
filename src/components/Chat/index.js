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


function Chat({navigation, route, startFetchingChatMessages, messages, isChatMessagesFetching, selectProfileUserId, sendMessage, userMessage}) {
  const [chatInput, setchatInput] = useState("");
  const refFlatList = useRef(null);
  useEffect(() => {
    if(userMessage.chat != null) {
      startFetchingChatMessages(userMessage.chat);
      const timer = setInterval(() => startFetchingChatMessages(userMessage.chat), 5000);
      return () => clearInterval(timer);
    }
  },[]);
  if(userMessage.first_name!==null)
    navigation.setOptions({ headerTitle: userMessage.first_name });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} 
      keyboardVerticalOffset={hp('12%')} >
      <SafeAreaView  style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.chatTextStyle}>
            <ChatTextInput onChange={setchatInput} value={chatInput} placeholder={'Escribe un mensaje'} multiline={false} send={() => {
              sendMessage(userMessage.chat, chatInput, userMessage.username, userMessage.userid, userMessage.first_name);
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
    userMessage: selectors.getSelectedUserMessage(state),
    messages: selectors.getChatMessages(state),
    isChatMessagesFetching: selectors.isChatMessagesFetching(state),
  }),
  dispatch => ({
    startFetchingChatMessages(chatId){
      if(chatId != null)
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
        if(chatId != null){
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