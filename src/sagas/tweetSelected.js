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



function* likeTweet(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getAuthUserID);
    const {idDB,id,is_liked} = action.payload;
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const url = is_liked ? '/likes/unlike/':'/likes/'
      const  response = yield call(
          fetch,
          `${API_BASE_URL}${url}`,
          {
            method: 'POST',
            body: JSON.stringify({user:userId,tweet:idDB}),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
      
      if (response.status <= 300) {
        yield put(actions.completeLikingTweet({...action.payload}));
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error al dar like al tweet.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failLikingTweet({...action.payload,error:errorMessage}));
        yield delay(200)
        // const alertButtons =[
        //       {text: 'Aceptar', style:'default'},
        //   ]
        // const titleError ="Inténtalo de nuevo"
     
          
      
        // yield call(Alert.alert,titleError,errorMessage,alertButtons)
      }
    }
  } catch (error) {
    
    console.log("ERROR", error)
    let errorMessage ="Falló la conexión.";
    yield put(actions.failLikingTweet({...action.payload,error:errorMessage}));
  }
}

export function* watchLikeTweet() {
  yield takeEvery(
    types.TWEET_LIKE_STARTED,
    likeTweet,
  );
}


function* retweetTweet(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getAuthUserID);
    const {idDB,id,is_retweeted} = action.payload;
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const url = is_retweeted ? '/retweets/unretweet/':'/retweets/'
      const  response = yield call(
          fetch,
          `${API_BASE_URL}${url}`,
          {
            method: 'POST',
            body: JSON.stringify({user:userId,originalTweet:idDB}),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
      
      if (response.status <= 300) {
        yield put(actions.completeRetweetingTweet({...action.payload}));
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error al dar retweet al tweet.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failRetweetingTweet({...action.payload,error:errorMessage}));
        yield delay(200)
        // const alertButtons =[
        //       {text: 'Aceptar', style:'default'},
        //   ]
        // const titleError ="Inténtalo de nuevo"
     
          
      
        // yield call(Alert.alert,titleError,errorMessage,alertButtons)
      }
    }
  } catch (error) {
    
    console.log("ERROR", error)
    let errorMessage ="Falló la conexión.";
    yield put(actions.failRetweetingTweet({...action.payload,error:errorMessage}));
  }
}

export function* watchRetweetTweet() {
  yield takeEvery(
    types.TWEET_RETWEET_STARTED,
    retweetTweet,
  );
}



function* saveTweet(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getAuthUserID);
    const {idDB,id,is_saved} = action.payload;
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const url = is_saved ? '/savedTweets/unsave/':'/savedTweets/'
      const  response = yield call(
          fetch,
          `${API_BASE_URL}${url}`,
          {
            method: 'POST',
            body: JSON.stringify({user:userId,tweet:idDB}),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
      
      if (response.status <= 300) {
        yield put(actions.completeSavingTweet({...action.payload}));
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error al guardar el tweet.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failSavingTweet({...action.payload,error:errorMessage}));
        yield delay(200)
        // const alertButtons =[
        //       {text: 'Aceptar', style:'default'},
        //   ]
        // const titleError ="Inténtalo de nuevo"
     
          
      
        // yield call(Alert.alert,titleError,errorMessage,alertButtons)
      }
    }
  } catch (error) {
    
    console.log("ERROR", error)
    let errorMessage ="Falló la conexión.";
    yield put(actions.failSavingTweet({...action.payload,error:errorMessage}));
  }
}

export function* watchSaveTweet() {
  yield takeEvery(
    types.TWEET_SAVE_TWEET_STARTED,
    saveTweet,
  );
}



function* fetchSavedTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getAuthUserID)
    
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/savedTweets/`,
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
          actions.completeFetchingSavedTweets(
            tweets,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo tweets guardados.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingSavedTweets(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingSavedTweets(errorMessage));
  }
}

export function* watchSavedTweetsFetch() {
  yield takeEvery(
    types.TWEETS_SAVED_FETCH_STARTED,
    fetchSavedTweets,
  );
}