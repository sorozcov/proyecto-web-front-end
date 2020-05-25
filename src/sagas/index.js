import { fork, all,spawn } from 'redux-saga/effects';
import { watchLoginStarted } from './auth';
import { watchSignUpStarted } from './signUp';
import { watchAlertChannel } from 'redux-saga-rn-alert';



function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchSignUpStarted),
    spawn(watchAlertChannel),
  ]);
}




export default mainSaga;
