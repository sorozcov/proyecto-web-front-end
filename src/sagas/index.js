import { fork, all,spawn } from 'redux-saga/effects';
import { watchLoginStarted } from './auth';
import { watchSignUpStarted } from './signUp';
import { watchAlertChannel } from 'redux-saga-rn-alert';

export const API_BASE_URL = 'http://192.168.0.3:8000/api/v1';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchSignUpStarted),
    spawn(watchAlertChannel),
  ]);
}




export default mainSaga;
