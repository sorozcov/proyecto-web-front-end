import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View,Text,Image,ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { reduxForm, Field } from 'redux-form';
import * as selectors from '../../reducers';
import Button from '../General/Button';
import TextInputTweet from '../General/TextInputTweet'
import * as tweetsActions from '../../actions/tweets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import randomString from 'random-string'



function NewTweet({navigation, dirty, valid, handleSubmit,userId,userInformation,startAddingTweet}) {

  const newTweet = values => {
    let content = values.tweet.trim().replace( /[\r\n]+/gm, " " )
    startAddingTweet({navigation,content:values.tweet,userId,userInformation})
  }


  return (
    <View style={styles.container}>
      <View style={{height:hp('2%')}}/>
      <Button label={'Twittear'} 
       disabled={!(dirty && valid)}
       onPress={handleSubmit(newTweet)}/>
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
  }),
  dispatch => ({
    startAddingTweet({navigation,content,userId,userInformation}) {
      let id= randomString();
      let payload={
        id,
        itemType:'tweet',
        data:{
          user:userInformation,
          date: new Date(),
          likes:0,
          comments:0,
          retweets:0,
          content:content,
          id,

        },
        content,
        user:userId,        

      }
      dispatch(tweetsActions.startAddingTweet(payload));    
      navigation.navigate('HomeFeed')  
    },
  }),
)(reduxForm({ 
  form: 'newTweet',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};

    errors.tweet = !values.tweet || values.tweet.replace( /[\r\n]+/gm, "").length==0 || values.tweet.trim()==""
      ? 'Este campo es obligatorio'
      : undefined;
    return errors;
  }
})(NewTweet));


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
      width:wp('82%'),
      flexDirection:'column',
      

  },

});