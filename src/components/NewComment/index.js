import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View,Text,Image,ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { reduxForm, Field } from 'redux-form';
import * as selectors from '../../reducers';
import Button from '../General/Button';
import TextInputTweet from '../General/TextInputTweet'
import * as tweetsSelectedActions from '../../actions/tweetSelected';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import randomString from 'random-string'
import tweetSelected from '../../reducers/tweetSelected';



function NewComment({navigation, dirty, valid, handleSubmit,userId,userInformation,startAddingComment,tweetSelectedId}) {

  const newComment = values => {
    let content = values.tweet.trim().replace( /[\r\n]+/gm, " " )
    startAddingComment({navigation,content:content,userId,userInformation,tweetSelectedId})
  }


  return (
    <View style={styles.container}>
      <View style={{height:hp('2%')}}/>
      <Button label={'Comentar'} 
       disabled={!(dirty && valid)}
       onPress={handleSubmit(newComment)}/>
      <ScrollView style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer} >
            <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
        </View>

        <View style={{...styles.contentCotainer}}>
        <Field name={'tweet'} component={TextInputTweet}  placeholder='¿Qué está pasando?' keyboardType='default' multiline={true} />
        </View>

      </View>
      </ScrollView>
      
      

    </View>
  );
}

export default connect(
  state => ({
    userId:selectors.getAuthUserID(state),
    userInformation:selectors.getAuthUserInformation(state),
    tweetSelectedId:selectors.getTweetSelectedId(state),
  }),
  dispatch => ({
    startAddingComment({navigation,content,userId,userInformation,tweetSelectedId}) {
      let id= randomString();
      let payload={
        id,
        user:userInformation,
        date: new Date(),
        content:content,
        is_mine:true,
        content, 
        tweet:{id:tweetSelectedId},
      }
      dispatch(tweetsSelectedActions.startAddingComment(payload));    
      navigation.pop(); 
    },
  }),
)(reduxForm({ 
  form: 'newComment',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};

    errors.tweet = !values.tweet || values.tweet.replace( /[\r\n]+/gm, "").length==0 || values.tweet.trim()==""
      ? 'Este campo es obligatorio'
      : undefined;
    return errors;
  }
})(NewComment));


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#fff',
   
  },
  flexRow:{
    flexDirection:'row'
  },
  imageContainer:{
      width:wp('15%')
  },
  imageProfile:{
      borderRadius:hp('50%'),
      height:hp('5%'),
      width:hp('5%'),
      margin:wp('4%'),
      marginRight:wp('0.5%'),
  },
  titleInfo:{
      width:wp('35%'),
      flexDirection:'row',
  },
  contentCotainer:{
      height:hp('100%'), 
      width:wp('82%'),
      flexDirection:'column',
      

  },

});