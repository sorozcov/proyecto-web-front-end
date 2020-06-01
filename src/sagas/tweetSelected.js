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
import { Alert } from 'react-native';
import API_BASE_URL  from './settings/apibaseurl';
import * as selectors from '../reducers';
import * as actions from '../actions/tweetSelected';
import * as types from '../types/tweetSelected';
import * as schemasComment from '../schemas/comments';
import * as schemasUsers from '../schemas/users';
import { actionTypes } from 'redux-form';




function* addComment(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const {content,user,tweet} = action.payload;
      
      const response = yield call(
        fetch,
        `${API_BASE_URL}/comments/`,
        {
          method: 'POST',
          body: JSON.stringify({content,user:user.id,tweet:tweet.id}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
     
      if (response.status <= 300) {
        const comment = yield response.json();
        yield put(
          actions.completeAddingComment({
            oldId:action.payload.id,
            comment,
          }),
        );
        console.log(comment)
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error al crear comentario.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failAddingComment({...action.payload,oldId:action.payload.id,error:errorMessage}));
        yield delay(200)
        const alertButtons =[
              {text: 'Aceptar', style:'default'},
          ]
        const titleError ="Inténtalo de nuevo"
          
      
        yield call(Alert.alert,titleError,errorMessage,alertButtons)
      }
    }
  } catch (error) {
    // yield put(actions.failLogin('Falló horrible la conexión mano'));
    console.log("ERROR", error)
    let errorMessage ="Falló la conexión al crear tweet.";
    yield put(actions.failAddingComment({...action.payload,oldId:action.payload.id,error:errorMessage}));
  }
}

export function* watchAddComment() {
  yield takeEvery(
    types.TWEET_COMMENT_ADD_STARTED,
    addComment,
  );
}

function* removeComment(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      
      const response = yield call(
        fetch,
        `${API_BASE_URL}/comments/${action.payload.id}/`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      
      if (response.status <= 300) {
        yield put(actions.completeRemoveComment({comment:action.payload,oldId:action.payload.id,}));
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error al eliminar el comentario.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failRemoveComment({comment:action.payload,oldId:action.payload.id,error:errorMessage}));
        yield delay(200)
        const alertButtons =[
              {text: 'Aceptar', style:'default'},
          ]
        const titleError ="Inténtalo de nuevo"
     
          
      
        yield call(Alert.alert,titleError,errorMessage,alertButtons)
      }
    }
  } catch (error) {
    
    console.log("ERROR", error)
    let errorMessage ="Falló la conexión eliminado el comentario.";
    yield put(actions.failRemoveComment({...action.payload,oldId:action.payload.id,error:errorMessage}));
  }
}

export function* watchRemoveComment() {
  yield takeEvery(
    types.TWEET_COMMENT_REMOVE_STARTED,
    removeComment,
  );
}



function* fetchComments(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const tweetId = yield select(selectors.getTweetSelectedId)
    
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/tweets/${tweetId}/comments/`,
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
        } = normalize(jsonResult, schemasComment.comments);
       
        yield put(
          actions.completeFetchingTweetComments(
            comments,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo comentarios.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingTweetComments(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingTweetComments(errorMessage));
  }
}

export function* watchCommentsTweetFetch() {
  yield takeEvery(
    types.TWEET_COMMENTS_FETCH_STARTED,
    fetchComments,
  );
}

function* fetchLikesUsers(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      const tweetId = yield select(selectors.getTweetSelectedId)
      
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/tweets/${tweetId}/likesUsers/`,
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
            entities: { users },
            result,
          } = normalize(jsonResult, schemasUsers.users);
         
          yield put(
            actions.completeFetchingTweetLikeUsers(
              users,
              result,
            ),
          );
        } else {
          const { detail } = yield response.json();
          let errorMessage ="Error obteniendo usuarios que han gustado la publicación.";
          if(detail!=undefined){errorMessage=detail}
          yield put(actions.failFetchingTweetLikeUsers(errorMessage));
  
        }
      }
    } catch (error) {
      console.log("ERROR", error)
      let errorMessage ="Error en la conexión.";
      yield put(actions.failFetchingTweetLikeUsers(errorMessage));
    }
  }
  
export function* watchTweetUserLikesFetch() {
    yield takeEvery(
      types.TWEET_LIKES_USERS_FETCH_STARTED,
      fetchLikesUsers,
    );
  }


  function* fetchRetweetUsers(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      const tweetId = yield select(selectors.getTweetSelectedId)
      
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/tweets/${tweetId}/retweetUsers/`,
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
            entities: { users },
            result,
          } = normalize(jsonResult, schemasUsers.users);
         
          yield put(
            actions.completeFetchingTweetRetweetUsers(
              users,
              result,
            ),
          );
        } else {
          const { detail } = yield response.json();
          let errorMessage ="Error obteniendo usuarios que han gustado la publicación.";
          if(detail!=undefined){errorMessage=detail}
          yield put(actions.failFetchingTweetRetweetUsers(errorMessage));
  
        }
      }
    } catch (error) {
      console.log("ERROR", error)
      let errorMessage ="Error en la conexión.";
      yield put(actions.failFetchingTweetRetweetUsers(errorMessage));
    }
  }
  
export function* watchTweetUserRetweetsFetch() {
    yield takeEvery(
      types.TWEET_RETWEETS_USERS_FETCH_STARTED,
      fetchRetweetUsers,
    );
  }