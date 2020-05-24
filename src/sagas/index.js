import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';

export const API_BASE_URL = 'http://192.168.0.3:8000/api/v1';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
  ]);
}


export default mainSaga;
