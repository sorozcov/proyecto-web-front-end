/* -------------------------------------------------------------------------- */
/*                                 Saga Search                                */
/* -------------------------------------------------------------------------- */

import {
  call,
  takeEvery,
  put,
  delay,
  select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import API_BASE_URL  from './settings/apibaseurl';
import * as selectors from '../reducers';
import * as actions from '../actions/search';
import * as types from '../types/search';
import * as schemas from '../schemas/search';


//Search Users
function* fetchSearchUsers(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/usersSearch/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
     
      if (response.status <= 300) {
        const jsonResult = yield response.json();
        
        const {
          entities: { users },
          result,
        } = normalize(jsonResult, schemas.users);
       
        yield put(
          actions.completeFetchingSearchUsers(
            users,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo usuarios.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingSearchUsers(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingSearchUsers(errorMessage));
  }
}

export function* watchSearchUsersFetch() {
  yield takeEvery(
    types.SEARCH_USERS_FETCH_STARTED,
    fetchSearchUsers,
  );
}

//Search Tweets
function* fetchSearchTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/tweetsSearch/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
     
      if (response.status <= 300) {
        const jsonResult = yield response.json();
        
        const {
          entities: { tweets },
          result,
        } = normalize(jsonResult, schemas.tweets);
       
        yield put(
          actions.completeFetchingSearchTweets(
            tweets,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo tweets.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingSearchTweets(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingSearchTweets(errorMessage));
  }
}

export function* watchSearchTweetsFetch() {
  yield takeEvery(
    types.SEARCH_TWEETS_FETCH_STARTED,
    fetchSearchTweets,
  );
}
