import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as selectors from '../../reducers';
import * as actionsNotifications from '../../actions/notifications';
import NotificationsList from '../NotificationsList';
import ButtonOption from '../General/ButtonOption';


function Notifications({navigation, notificationsRetweets, notificationsComments, notificationsLikes, isNotificationsRetweetsFetching, isNotificationsCommentsFetching, isNotificationsLikesFetching, startFetchingNotificationsRetweets, startFetchingNotificationsComments, startFetchingNotificationsLikes}) {
  const [toolBarOption, setToolBarOption] = useState(0);
  useEffect(() => {
    if(toolBarOption===0)
      startFetchingNotificationsRetweets();
    if(toolBarOption===1)
      startFetchingNotificationsComments();
    if(toolBarOption===2)
      startFetchingNotificationsLikes();
  },[toolBarOption]);
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',height:hp('7%')}}>
        <ButtonOption options={['Retweets','Comentarios','Likes']}  onPressVar={toolBarOption} onPressAction={setToolBarOption} />
      </View>
      
      {toolBarOption===0 && 
        <NotificationsList navigation={navigation} userArray={notificationsRetweets} container={{height:Platform.OS === 'ios' ? hp('75%') : hp('77%') }}
          currentKey={'notificationsRetweets'} infoText={'Retwitteo un tweet tuyo hace '} infoEmptyText={'No hay nada que ver por aquí... por ahora.'}
          recommendEmptyText={'Cuando alguien haga retweet a un tweet tuyo lo verás aquí.'}
          isFetching={isNotificationsRetweetsFetching}  onRefresh={()=>{startFetchingNotificationsRetweets()}}>
        </NotificationsList>
      }

      {toolBarOption===1 && 
      <NotificationsList navigation={navigation} userArray={notificationsComments} container={{height:Platform.OS === 'ios' ? hp('75%') : hp('77%') }}
        currentKey={'notificationsComments'} infoText={'Comentó un tweet tuyo hace '} infoEmptyText={'No hay nada que ver por aquí... por ahora.'}
        recommendEmptyText={'Cuando alguien comente a un tweet tuyo lo verás aquí.'}
        isFetching={isNotificationsCommentsFetching}  onRefresh={()=>{startFetchingNotificationsComments()}}>
      </NotificationsList>
      }
      
      {toolBarOption===2 && 
      <NotificationsList navigation={navigation} userArray={notificationsLikes} container={{height:Platform.OS === 'ios' ? hp('75%') : hp('77%') }}
        currentKey={'notificationsLikes'} infoText={'Le gustó un tweet tuyo hace '} infoEmptyText={'No hay nada que ver por aquí... por ahora.'}
        recommendEmptyText={'Cuando alguien le de like a un tweet tuyo lo verás aquí.'}
        isFetching={isNotificationsLikesFetching}  onRefresh={()=>{startFetchingNotificationsLikes()}}>
      </NotificationsList>
      }

    </View>
  );
}

export default connect(
  state => ({
    notificationsRetweets: selectors.getNotificationsRetweets(state),   
    notificationsComments: selectors.getNotificationsComments(state),   
    notificationsLikes: selectors.getNotificationsLikes(state),   
    isNotificationsRetweetsFetching: selectors.isNotificationsRetweetsFetching(state),   
    isNotificationsCommentsFetching: selectors.isNotificationsCommentsFetching(state),   
    isNotificationsLikesFetching: selectors.isNotificationsLikesFetching(state),   
  }),
  dispatch => ({
    startFetchingNotificationsRetweets() {
      dispatch(actionsNotifications.startFetchingNotificationsRetweets());
    },
    startFetchingNotificationsComments() {
      dispatch(actionsNotifications.startFetchingNotificationsComments());
    },
    startFetchingNotificationsLikes() {
      dispatch(actionsNotifications.startFetchingNotificationsLikes());
    },
  }),
)(Notifications);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
});