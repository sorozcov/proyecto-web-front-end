import { fork, all,spawn } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';
import { watchSignUpStarted } from './signUp';
import { watchSavedTweetsFetch,watchAddTweet,watchRemoveTweet,watchTweetsHomeFetch,watchLikeTweet,watchRetweetTweet,watchSaveTweet } from './tweets';
import { watchProfileInfoRequest, watchProfileFollowersFetch, watchProfileFollowingFetch, watchProfileMyTweetsFetch, watchProfileLikedTweetsFetch, watchFollowProfile } from './profile';
import { watchSearchUsersFetch, watchSearchTweetsFetch } from './search';
import { watchNotificationsRetweetsFetch, watchNotificationsCommentsFetch, watchNotificationsLikesFetch } from './notifications';
import { watchUserMessagesFetch, watchChatMessagesFetch, watchUserMessagesAdd, watchChatMessagesAdd } from './chat';
import { watchAddComment,watchRemoveComment,watchTweetUserLikesFetch,watchTweetUserRetweetsFetch,watchCommentsTweetFetch } from './tweetSelected';
import { watchAlertChannel } from 'redux-saga-rn-alert';




function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchUserInformationRequest),
    fork(watchRefreshTokenStarted),
    fork(watchSignUpStarted),
    fork(watchTweetsHomeFetch),
    fork(watchAddTweet),
    fork(watchRemoveTweet),
    fork(watchSaveTweet),
    fork(watchLikeTweet),
    fork(watchRetweetTweet),
    fork(watchSavedTweetsFetch),
    fork(watchProfileInfoRequest),
    fork(watchProfileFollowersFetch),
    fork(watchProfileFollowingFetch),
    fork(watchProfileMyTweetsFetch),
    fork(watchProfileLikedTweetsFetch),
    fork(watchFollowProfile),
    fork(watchSearchUsersFetch),
    fork(watchSearchTweetsFetch),
    fork(watchUserMessagesFetch),
    fork(watchChatMessagesFetch),
    fork(watchUserMessagesAdd),
    fork(watchChatMessagesAdd),
    fork(watchNotificationsRetweetsFetch),
    fork(watchNotificationsCommentsFetch),
    fork(watchNotificationsLikesFetch),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchTweetUserLikesFetch),
    fork(watchTweetUserRetweetsFetch),
    fork(watchCommentsTweetFetch),
    
    spawn(watchAlertChannel),
  ]);
}




export default mainSaga;
