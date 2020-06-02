/* -------------------------------------------------------------------------- */
/*                             Saga Notifications                             */
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
import * as actions from '../actions/notifications';
import * as types from '../types/notifications';
import * as schemas from '../schemas/notifications';


//Notifications retweets
function* fetchNotificationsRetweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/retweetsNotification/`,
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
          entities: { retweets },
          result,
        } = normalize(jsonResult, schemas.retweets);
       
        yield put(
          actions.completeFetchingNotificationsRetweets(
            retweets,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo retweets.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingNotificationsRetweets(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingNotificationsRetweets(errorMessage));
  }
}

export function* watchNotificationsRetweetsFetch() {
  yield takeEvery(
    types.NOTIFICATIONS_RETWEETS_FETCH_STARTED,
    fetchNotificationsRetweets,
  );
}

//Notifications comments
function* fetchNotificationsComments(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/commentsNotification/`,
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
          entities: { comments },
          result,
        } = normalize(jsonResult, schemas.comments);
       
        yield put(
          actions.completeFetchingNotificationsComments(
            comments,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo comentarios.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingNotificationsComments(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingNotificationsComments(errorMessage));
  }
}

export function* watchNotificationsCommentsFetch() {
  yield takeEvery(
    types.NOTIFICATIONS_COMMENTS_FETCH_STARTED,
    fetchNotificationsComments,
  );
}

//Notifications likes
function* fetchNotificationsLikes(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/likesNotification/`,
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
          entities: { likes },
          result,
        } = normalize(jsonResult, schemas.likes);
       
        yield put(
          actions.completeFetchingNotificationsLikes(
            likes,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo likes.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingNotificationsLikes(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingNotificationsLikes(errorMessage));
  }
}

export function* watchNotificationsLikesFetch() {
  yield takeEvery(
    types.NOTIFICATIONS_LIKES_FETCH_STARTED,
    fetchNotificationsLikes,
  );
}
