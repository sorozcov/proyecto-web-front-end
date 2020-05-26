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
import * as actions from '../actions/profile';
import * as types from '../types/profile';
import * as schemas from '../schemas/profile';


//Profile Information
function* profileInfoRequest(action) {
  try {
    
   
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getProfileSelectedUserId);
   
    if (isAuth) {
     
      const token = yield select(selectors.getAuthToken);
      
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
    
    
      if (response.status <= 300) {
        const jsonResultUser = yield response.json();
        yield put(actions.completeFetchingProfileInfo(jsonResultUser));
        yield put(actions.startFetchingProfileFollowers());
        
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo followers.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingProfileFollowers(errorMessage)); 
      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingProfileFollowers(errorMessage));
  }
}


export function* watchProfileInfoRequest() {
  yield takeEvery(
    types.PROFILE_INFO_FETCH_STARTED,
    profileInfoRequest,
  );
}

//Profile Followers
function* fetchProfileFollowers(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getProfileSelectedUserId)
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/followers/`,
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
          entities: { followers },
          result,
        } = normalize(jsonResult, schemas.followers);
       
        yield put(
          actions.completeFetchingProfileFollowers(
            followers,
            result,
          ),
        );
        yield put(actions.startFetchingProfileFollowing());
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo followers.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingProfileFollowers(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingProfileFollowers(errorMessage));
  }
}

export function* watchProfileFollowersFetch() {
  yield takeEvery(
    types.PROFILE_FOLLOWERS_FETCH_STARTED,
    fetchProfileFollowers,
  );
}

//Profile Following
function* fetchProfileFollowing(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getProfileSelectedUserId)
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/following/`,
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
          entities: { followings },
          result,
        } = normalize(jsonResult, schemas.followings);
       
        yield put(
          actions.completeFetchingProfileFollowing(
            followings,
            result,
          ),
        );
        yield put(actions.startFetchingProfileMyTweets());
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo followings.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingProfileFollowing(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingProfileFollowing(errorMessage));
  }
}

export function* watchProfileFollowingFetch() {
  yield takeEvery(
    types.PROFILE_FOLLOWING_FETCH_STARTED,
    fetchProfileFollowing,
  );
}

//Profile my tweets
function* fetchProfileMyTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getProfileSelectedUserId)
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/tweets/`,
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
          entities: { myTweets },
          result,
        } = normalize(jsonResult, schemas.myTweets);
       
        yield put(
          actions.completeFetchingProfileMyTweets(
            myTweets,
            result,
          ),
        );
        yield put(actions.startFetchingProfileLikedTweets());
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo los tweets del usuario.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingProfileMyTweets(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingProfileMyTweets(errorMessage));
  }
}

export function* watchProfileMyTweetsFetch() {
  yield takeEvery(
    types.PROFILE_MY_TWEETS_FETCH_STARTED,
    fetchProfileMyTweets,
  );
}

//Profile liked tweets
function* fetchProfileLikedTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getProfileSelectedUserId)
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/likedTweets/`,
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
          entities: { likedTweets },
          result,
        } = normalize(jsonResult, schemas.likedTweets);
       
        yield put(
          actions.completeFetchingProfileLikedTweets(
            likedTweets,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo los tweets que le ha dado like el usuario.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingProfileLikedTweets(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingProfileLikedTweets(errorMessage));
  }
}

export function* watchProfileLikedTweetsFetch() {
  yield takeEvery(
    types.PROFILE_LIKED_TWEETS_FETCH_STARTED,
    fetchProfileLikedTweets,
  );
}

