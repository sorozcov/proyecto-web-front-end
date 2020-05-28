import { fork, all,spawn } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';
import { watchSignUpStarted } from './signUp';
import { watchAddTweet,watchRemoveTweet,watchTweetsHomeFetch } from './tweets';
import { watchProfileInfoRequest, watchProfileFollowersFetch, watchProfileFollowingFetch, watchProfileMyTweetsFetch, watchProfileLikedTweetsFetch } from './profile';
import { watchSearchUsersFetch, watchSearchTweetsFetch } from './search';
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
    fork(watchProfileInfoRequest),
    fork(watchProfileFollowersFetch),
    fork(watchProfileFollowingFetch),
    fork(watchProfileMyTweetsFetch),
    fork(watchProfileLikedTweetsFetch),
    fork(watchSearchUsersFetch),
    fork(watchSearchTweetsFetch),
    
    spawn(watchAlertChannel),
  ]);
}




export default mainSaga;
