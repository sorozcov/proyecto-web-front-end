import React,{useState} from 'react';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, Image, Text, TouchableOpacity,Modal,TouchableWithoutFeedback ,Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actionsProfile from '../../actions/profile'
import * as actionsTweets from '../../actions/tweets'
import * as actionsTweetSelected from '../../actions/tweetSelected'
import Button from '../General/Button';
let moment = require('moment');

function Tweet({navigation,tweet,styleContainer={},styleContent={},selectProfileUserId,isTweetConfirmed,likeTweet,retweetTweet,saveTweet,deleteTweet,newComment,selectTweetInfo}) {
    const [optionsModal, setOptionsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    function likeFormat(num) {
        if (num==0) return '';
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }
    
    function startDelete(id,tweetid){
        Alert.alert(
            '¿Eliminar tweet?',
            'Esta acción no puede ser revertida',
            [
                {
                    text: 'Cancelar', 
                    style: 'cancel',
                    onPress:()=>{setDeleteModal(false)}
                },
                {
                    text: 'Eliminar',
                    onPress:() => {deleteTweet(id,tweetid);setDeleteModal(false);},
                    style: 'destructive'
                }
            ],
            {
                cancelable: true,
            },
        )
    }
    
    return(
    
    <View style={tweet.isConfirmed? {...styles.tweetContainer,...styleContainer}:{...styles.tweetContainer,...styleContainer,backgroundColor:'transparent'}}>
    <View style={{flexDirection:'column'}}>
    <View style={{...styles.flexRow}}>
        
      <TouchableOpacity onPress={()=>selectProfileUserId(navigation,tweet.data.user.id)}>
        <View style={styles.imageContainer} >
            <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
        </View>
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        {tweet.itemType=='retweet' && tweet.itemType!==null && 
                
                  <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>selectProfileUserId(navigation,tweet.user_retweet.id)}><MaterialCommunityIcons name="twitter-retweet" style={{
                    marginTop:wp('1.0%'),
                    color:'gray',
                    paddingLeft:wp('1%'),
                   }}  color={tweet.data.is_retweeted ? 'green':'gray'} size={22}  /><Text style={styles.retweetInfo}>{tweet.user_retweet.username} ha retwitteado.</Text></TouchableOpacity>
                
        } 
        <View style={styles.flexRow}>
            
          <View style={styles.titleInfo}>
            <Text numberOfLines={1} style={styles.userNameStyle}>{tweet.data.user.first_name}</Text>
            <Text numberOfLines={1}  style={styles.infoUserNameStyle}>@{tweet.data.user.username}  · </Text>
            
            
          </View>
          <View style={styles.caretContainer}>
              <TouchableOpacity onPress={()=>tweet.data.is_mine?setDeleteModal(true):null}><MaterialCommunityIcons style={styles.caretIcon} name="chevron-down" color={'gray'} size={22} /></TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.contentCotainer,...styleContent}}>
            <Text style={styles.textContainerStyle}>{tweet.data.content}</Text>
            <Text style={styles.dateStyle}>{moment(tweet.data.date).format(' h:mm · MM/D/YY')}</Text>
        </View>
       
      </View>
      </View>
      <View style={{flexDirection:'column',width:wp('100%')}}
            style={{
                borderBottomColor: '#EAEAEA',
                borderBottomWidth: 1,
            }}
            />
    <View style={styles.infoLikesStyle}>
            <View style={{flexDirection:'row',paddingBottom:hp('0.5%'),paddingLeft:wp('5%')}}>
                {tweet.data.retweets>0 && <TouchableOpacity onPress={()=>navigation.navigate('UserRetweetList')} style={{flexDirection:'row'}}>
                    <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{likeFormat(tweet.data.retweets)} </Text>
                    <Text style={styles.caption}>Retweets </Text> 
                    
                
                </TouchableOpacity>}
                
                {tweet.data.likes>0 && <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>navigation.navigate('UserLikeList')}>
                    <Text style={{...styles.caption,fontWeight:'bold',color:'black'}}>{likeFormat(tweet.data.likes)} </Text>
                    <Text style={styles.caption}>Likes </Text> 
                    </TouchableOpacity>}
                {tweet.data.likes==0 && tweet.data.retweets==0 && <TouchableOpacity style={{flexDirection:'row'}}>
                    
                    <Text style={styles.caption}>No hay actividad en este tweet. </Text> 
                    
                
                </TouchableOpacity>}
            </View>
    </View>
    <View style={{flexDirection:'column',width:wp('100%')}}
                style={{
                    borderBottomColor: '#EAEAEA',
                    borderBottomWidth: 1,
                }}
                />
      
        {tweet.itemType!==null && <View style={styles.footerContainerStyle}>
    <TouchableOpacity style={{flexDirection:'row'}}><MaterialCommunityIcons name="chat-outline" color={'gray'} size={24} onPress={()=>newComment(tweet.data.id,tweet,navigation)} /></TouchableOpacity>
     <TouchableOpacity style={{flexDirection:'row'}}><MaterialCommunityIcons name="twitter-retweet" onPress={()=>retweetTweet(tweet.data.id,tweet.id,tweet.data.is_retweeted)}  color={tweet.data.is_retweeted ? 'green':'gray'} size={24} /></TouchableOpacity>
    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>likeTweet(tweet.data.id,tweet.id,tweet.data.is_liked)}><MaterialCommunityIcons name={tweet.data.is_liked ? 'heart':'heart-outline'}  color={tweet.data.is_liked ? 'red':'gray'} size={24} /></TouchableOpacity>
    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>setOptionsModal(true)}><MaterialCommunityIcons name="export-variant" color={'gray'} size={24} /></TouchableOpacity>
        </View>}
      
      
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={optionsModal}
        
      >
       
       <TouchableWithoutFeedback 
            
          
            onPress={() => {setOptionsModal(false)}}>
        
        <View style={{height:hp('60%')}}></View>
        </TouchableWithoutFeedback>

        
          <TouchableOpacity 
            
            activeOpacity={1} 
            
            style={{backgroundColor:'white',height:hp('35%'),borderColor:'gray',borderTopWidth:10,borderRadius: 20,}}
          >
              
        <Button label={!tweet.data.is_saved ? 'Agregar Tweet a Elementos guardados':'Eliminar Tweet de Elementos Guardados'} 
           buttonStyle={{backgroundColor:'#EAEAEA',marginTop:hp('14%'),height:hp('10%')}}
           labelStyle={{color:'gray',fontWeight:'normal',textAlign:'center'}}
           icon={<MaterialCommunityIcons name={!tweet.data.is_saved ? "bookmark-plus-outline":'bookmark-minus-outline'} color={'gray'} size={40} />}
            onPress={()=>{saveTweet(tweet.data.id,tweet.id,tweet.data.is_saved);setOptionsModal(false);}}/>
        
        <Button label={'Cancelar'} 
           buttonStyle={{backgroundColor:'#EAEAEA',marginBottom:hp('0%')}}
           labelStyle={{color:'black'}}
            onPress={()=>setOptionsModal(false)}/>
       
       
     
        </TouchableOpacity>
      
       
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModal}
        
      >
       
       <TouchableWithoutFeedback 
            
          
            onPress={() => {setDeleteModal(false)}}>
        
        <View style={{height:hp('60%')}}></View>
        </TouchableWithoutFeedback>

        
          <TouchableOpacity 
            
            activeOpacity={1} 
            
            style={{backgroundColor:'white',height:hp('45%'),borderColor:'gray',borderTopWidth:10,borderRadius: 20,}}
          >
              
        <Button label={'Eliminar mi Tweet'} 
           buttonStyle={{backgroundColor:'#EAEAEA',marginTop:hp('14%'),height:hp('10%')}}
           labelStyle={{color:'#F85050',fontWeight:'normal',textAlign:'center'}}
           icon={<MaterialCommunityIcons name={'trash-can-outline'} color={'#F85050'} size={40} />}
            onPress={()=>
            {
            startDelete(tweet.data.id,tweet.id);
           
            }}/>
        
        <Button label={'Cancelar'} 
           buttonStyle={{backgroundColor:'#EAEAEA',marginBottom:hp('0%')}}
           labelStyle={{color:'black'}}
            onPress={()=>setDeleteModal(false)}/>
       
       
     
        </TouchableOpacity>
      
       
      </Modal>
    
    
  </View>
 
  )

}


Tweet = connect(
    state => ({
      isFetchingHomeTweets: selectors.isFetchingTweets(state),
      tweetsHome: selectors.getTweets(state),
      user: selectors.getAuthUser(state),
      token:selectors.getAuthToken(state),
      isTweetConfirmed:(id)=>selectors.getTweet(state,id).isConfirmed
     
    }),
    dispatch => ({
        selectProfileUserId(navigation, userId){
            
            dispatch(actionsProfile.setSelectedProfileUserId(userId));
            navigation.navigate('Profile');
        },
        likeTweet(idDB,id,is_liked){
            
            dispatch(actionsTweets.startLikingTweet(idDB,id,is_liked))
        },
        retweetTweet(idDB,id,is_retweeted){
            
            dispatch(actionsTweets.startRetweetingTweet(idDB,id,is_retweeted))
        },
        saveTweet(idDB,id,is_saved){
            
            dispatch(actionsTweets.startSavingTweet(idDB,id,is_saved))
        },
        deleteTweet(idDB,id){
            
            dispatch(actionsTweets.startRemovingTweet(idDB,id))
        },
        newComment(id,tweet,navigation){
            dispatch(actionsTweetSelected.setSelectedTweetId(id,tweet))
            navigation.navigate('NewComment')
        },
        selectTweetInfo(id,tweet,navigation){
            dispatch(actionsTweetSelected.setSelectedTweetId(id,tweet))
            navigation.navigate('TweetFullScreen')
        },
    }),
  )(Tweet);
export default Tweet;
const styles = StyleSheet.create({
    tweetContainer: {
        width:wp('100%'),
        backgroundColor:'white',
        borderBottomColor:'#EAEAEA',
        borderBottomWidth:0.5,
        flexDirection:'column'
    },
    flexRow:{
        flexDirection:'row'
    },
    imageContainer:{
        width:wp('20%')
    },
    imageProfile:{
        borderRadius:hp('50%'),
        height:hp('6.5%'),
        width:hp('6.5%'),
        margin:wp('3%'),
        marginTop:hp('1.5%'),
        marginRight:wp('0.5%'),
    },
    titleInfo:{
        width:wp('35%'),
        flexDirection:'row',
    },
    contentCotainer:{
        width:wp('80%'),
        flexDirection:'column',
        
        paddingBottom:hp('1%'),
    },
    userNameStyle:{
        marginTop:wp('2%'),
        fontSize:21,
        fontWeight:'bold',
    },
    infoUserNameStyle:{
        marginTop:wp('2%'),
        color:'gray',
        paddingLeft:wp('1%'),
        fontSize:21
    },
    retweetInfo:{
        marginTop:wp('1.3%'),
        color:'gray',
        paddingLeft:wp('1%'),
        fontSize:21
    },
    titleContainer:{
        width:wp('85%')
    },
    caretContainer:{
        marginLeft:wp('35%')
    },
    caretIcon:{
        marginTop:wp('2%'),
        paddingLeft:wp('1%')
    },
    textContainerStyle:{
        marginTop:wp('2%'),
        fontSize:21,
        marginRight:wp('2%')
    },
    dateStyle:{
        marginTop:wp('3%'),
        fontSize:14,
        color:'gray',
        marginRight:wp('2%')
    },
    infoLikesStyle:{
        flexDirection:'row',
        width:wp('100%'),
        marginTop:wp('2%'),
        paddingBottom:hp('0.5%'),
        
    },
    footerContainerStyle:{
        flexDirection:'row',
        width:wp('100%'),
        marginTop:wp('2%'),
        paddingBottom:hp('0.5%'),
        justifyContent:'space-around'
    },
    caption: {
        fontSize: wp('4%'),
        lineHeight: hp('2%'),
        paddingTop: hp('0.8%'),
        color:'gray'
      },


  });

