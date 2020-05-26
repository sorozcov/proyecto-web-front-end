import React from 'react';
import TimeAgo from 'react-native-timeago';
import { StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actionsProfile from '../../actions/profile'


let backgroundColorTweet ='white';
function Tweet({navigation,tweet,styleContainer={},styleContent={},selectProfileUserId}) {
    backgroundColorTweet = (tweet.isConfirmed ? 'white' : '#EAEAEA')
    
    return(
    <View style={{...styles.tweetContainer,...styleContainer}}>
    <View style={styles.flexRow}>
      <TouchableOpacity onPress={()=>selectProfileUserId(navigation,tweet.data.user.id)}>
        <View style={styles.imageContainer} >
            <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
        </View>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <View style={styles.flexRow}>
          <View style={styles.titleInfo}>
            <Text numberOfLines={1} style={styles.userNameStyle}>{tweet.data.user.first_name}</Text>
            <Text numberOfLines={1}  style={styles.infoUserNameStyle}>@{tweet.data.user.username}  · </Text>
            <TimeAgo style={styles.infoUserNameStyle} time={tweet.data.date} hideAgo={true} interval={300}/>
            
          </View>
          <View style={styles.caretContainer}>
              <MaterialCommunityIcons style={styles.caretIcon} name="chevron-down" color={'gray'} size={22} />
          </View>
        </View>
        <View style={{...styles.contentCotainer,...styleContent}}>
            <Text style={styles.textContainerStyle}>{tweet.data.content}</Text>
        </View>
        {tweet.itemType=='retweet' && tweet.itemType!==null && 
                    <View style={{paddingBottom:hp('1%')}}>
                    <Tweet navigation={navigation} styleContent={{width:wp('62%')}} styleContainer={{borderBottomColor:'#EAEAEA',borderColor:'#EAEAEA',borderWidth:1,borderRadius:10,width:wp('80%')}} tweet={{data:tweet.data.originalTweet,itemType:null}} ></Tweet>
                    </View>
        }
        {tweet.itemType!==null && <View style={styles.footerContainerStyle}>
          <MaterialCommunityIcons name="chat-outline" color={'gray'} size={18} />
          {tweet.itemType=='tweet' && <MaterialCommunityIcons name="twitter-retweet" color={'gray'} size={22} />}
          <MaterialCommunityIcons name="heart-outline" color={'gray'} size={18} />
          <MaterialCommunityIcons name="export-variant" color={'gray'} size={18} />
        </View>}
      </View>
      
      
    </View>
    
    
    
  </View>
  )

}


Tweet = connect(
    state => ({
      isFetchingHomeTweets: selectors.isFetchingTweets(state),
      tweetsHome: selectors.getTweets(state),
      user: selectors.getAuthUser(state),
      token:selectors.getAuthToken(state),
     
    }),
    dispatch => ({
        selectProfileUserId(navigation, userId){
            
            dispatch(actionsProfile.setSelectedProfileUserId(userId));
            navigation.navigate('Profile');
        }
    }),
  )(Tweet);
export default Tweet;
const styles = StyleSheet.create({
    tweetContainer: {
        width:wp('100%'),
        backgroundColor:backgroundColorTweet,
        borderBottomColor:'#EAEAEA',
        borderBottomWidth:0.5,
        flexDirection:'column'
    },
    flexRow:{
        flexDirection:'row'
    },
    imageContainer:{
        width:wp('15%')
    },
    imageProfile:{
        borderRadius:hp('50%'),
        height:hp('4.5%'),
        width:hp('4.5%'),
        margin:wp('2%'),
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
        marginTop:wp('2.4%'),
        fontSize:17,
        fontWeight:'bold',
    },
    infoUserNameStyle:{
        marginTop:wp('2.4%'),
        color:'gray',
        paddingLeft:wp('1%'),
        fontSize:17
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
        fontSize:16,
        marginRight:wp('2%')
    },
    footerContainerStyle:{
        flexDirection:'row',
        width:wp('65%'),
        paddingBottom:hp('0.5%'),
        justifyContent:'space-between'
    },


  });

