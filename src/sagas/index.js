import { fork, all,spawn } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest } from './auth';
import { watchSignUpStarted } from './signUp';
import { watchAddTweet,watchRemoveTweet,watchTweetsHomeFetch } from './tweets';
import { watchAlertChannel } from 'redux-saga-rn-alert';



function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchUserInformationRequest),
    fork(watchSignUpStarted),
    fork(watchTweetsHomeFetch),
    fork(watchAddTweet),
    fork(watchRemoveTweet),
    spawn(watchAlertChannel),
  ]);
}




export default mainSaga;
