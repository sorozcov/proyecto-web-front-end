import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
  } from 'redux-saga/effects';
  
  import * as selectors from '../reducers';
  import * as actions from '../actions/auth';
  import * as types from '../types/auth';
  
import {API_BASE_URL} from './index';
  
  
  function* login(action) {
    try {
      const response = yield call(
        fetch,
        `${API_BASE_URL}/token-auth/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );
  
      if (response.status === 200) {
        const { token } = yield response.json();
        yield put(actions.completeLogin(token));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failLogin(non_field_errors[0]));
      }
    } catch (error) {
      yield put(actions.failLogin('Falló la autentitación.'));
    }
  }
  
  export function* watchLoginStarted() {
    yield takeEvery(
      types.AUTHENTICATION_STARTED,
      login,
    );
  }
  