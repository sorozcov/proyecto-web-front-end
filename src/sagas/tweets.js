import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import API_BASE_URL  from './settings/apibaseurl';
import * as selectors from '../reducers';
import * as actions from '../actions/tweets';
import * as types from '../types/tweets';
import * as schemas from '../schemas/tweets';


function* fetchTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getAuthUserID)
    console.log("Fetch Tweets")
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/followingTweets/`,
        {
          method: 'GET',
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
          actions.completeFetchingTweetsHome(
            tweets,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo tweets.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingTweetsHome(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingTweetsHome(errorMessage));
  }
}

export function* watchTweetsHomeFetch() {
  yield takeEvery(
    types.TWEETS_HOME_FETCH_STARTED,
    fetchTweets,
  );
}

function* addTweet(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/tweets/`,
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
        yield put(
          actions.completeAddingTweet(
            action.payload.id,
            jsonResult,
          ),
        );

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error agregando tweet.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failAddingTweet(action.payload.id,errorMessage));
      }
    }
  } catch (error) {
    // yield put(actions.failLogin('Falló horrible la conexión mano'));
    console.log("ERROR", error)
    let errorMessage ="Falló la conexión al crear tweet.";
    yield put(actions.failAddingTweet(action.payload.id,errorMessage));
  }
}

export function* watchAddTweet() {
  yield takeEvery(
    types.TWEET_ADD_STARTED,
    addTweet,
  );
}

function* removeTweet(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/tweets/${action.payload.id}/`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status <= 300) {
        yield put(actions.completeRemovingTweet(action.payload.id));
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error eliminado tweet.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failRemovingTweet(action.payload.id,errorMessage));
      }
    }
  } catch (error) {
    
    console.log("ERROR", error)
    let errorMessage ="Falló la conexión eliminado el tweet.";
    yield put(actions.failRemovingTweet(action.payload.id,errorMessage));
  }
}

export function* watchRemoveTweet() {
  yield takeEvery(
    types.TWEET_REMOVE_STARTED,
    removeTweet,
  );
}
