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


function Comment({navigation,comment,styleContainer={},styleContent={},selectProfileUserId,deleteComment}) {
    const [deleteModal, setDeleteModal] = useState(false);

    
    function startDelete(comment){
        Alert.alert(
            '¿Eliminar comentario?',
            'Esta acción no puede ser revertida',
            [
                {
                    text: 'Cancelar', 
                    style: 'cancel',
                    onPress:()=>{setDeleteModal(false)}
                },
                {
                    text: 'Eliminar',
                    onPress:() => {deleteComment(comment);setDeleteModal(false);},
                    style: 'destructive'
                }
            ],
            {
                cancelable: true,
            },
        )
    }
    
    return(

    <View style={comment.isConfirmed? {...styles.tweetContainer,...styleContainer}:{...styles.tweetContainer,...styleContainer,backgroundColor:'transparent'}}>
    <View style={{...styles.flexRow}}>
        
      <TouchableOpacity onPress={()=>selectProfileUserId(navigation,comment.user.id)}>
        <View style={styles.imageContainer} >
            <Image style={styles.imageProfile}   source={require('../../assets/images/egg.jpg')}></Image>
        </View>
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>

        <View style={styles.flexRow}>
            
          <View style={styles.titleInfo}>
            <Text numberOfLines={1} style={styles.userNameStyle}>{comment.user.first_name}</Text>
            <Text numberOfLines={1}  style={styles.infoUserNameStyle}>@{comment.user.username}  · </Text>
            <TimeAgo style={styles.infoUserNameStyle} time={comment.date} hideAgo={true} interval={300}/>
            
          </View>
          <View style={styles.caretContainer}>
              <TouchableOpacity onPress={()=>comment.is_mine?setDeleteModal(true):null}><MaterialCommunityIcons style={styles.caretIcon} name="chevron-down" color={'gray'} size={22} /></TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.contentCotainer,...styleContent}}>
            <Text style={styles.textContainerStyle}>{comment.content}</Text>
        </View>

      </View>
      
      
    </View>

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
              
        <Button label={'Eliminar mi Comentario'} 
           buttonStyle={{backgroundColor:'#EAEAEA',marginTop:hp('14%'),height:hp('10%')}}
           labelStyle={{color:'#F85050',fontWeight:'normal',textAlign:'center'}}
           icon={<MaterialCommunityIcons name={'trash-can-outline'} color={'#F85050'} size={40} />}
            onPress={()=>
            {
            startDelete(comment);
           
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


Comment = connect(
    state => ({

      user: selectors.getAuthUser(state),
      token:selectors.getAuthToken(state),
      
     
    }),
    dispatch => ({
        selectProfileUserId(navigation, userId){
            
            dispatch(actionsProfile.setSelectedProfileUserId(userId));
            navigation.navigate('Profile');
        },

        deleteComment(comment){
            
            dispatch(actionsTweetSelected.startRemoveComment(comment))
        },

    }),
  )(Comment);
export default Comment;
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
        width:wp('17%')
    },
    imageProfile:{
        borderRadius:hp('50%'),
        height:hp('5.4%'),
        width:hp('5.4%'),
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
        fontSize:17,
        fontWeight:'bold',
    },
    infoUserNameStyle:{
        marginTop:wp('2%'),
        color:'gray',
        paddingLeft:wp('1%'),
        fontSize:17
    },
    retweetInfo:{
        marginTop:wp('1.3%'),
        color:'gray',
        paddingLeft:wp('1%'),
        fontSize:14
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

