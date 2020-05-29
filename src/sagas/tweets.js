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
import * as actions from '../actions/tweets';
import * as types from '../types/tweets';
import * as schemas from '../schemas/tweets';



function* fetchTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getAuthUserID)
    
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
      const {content,user} = action.payload;
      
      const response = yield call(
        fetch,
        `${API_BASE_URL}/tweets/`,
        {
          method: 'POST',
          body: JSON.stringify({content,user}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status <= 300) {
        const jsonResult = yield response.json();
        const tweet ={
          id:'tweet-'+jsonResult.id,
          itemType:'tweet',
          data:jsonResult
        }
        console.log('jeje')
        yield put(
          actions.completeAddingTweet(
            action.payload.id,
            tweet,
          ),
        );
        console.log(tweet)
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error al crear el tweet.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failAddingTweet(action.payload.id,errorMessage));
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
        `${API_BASE_URL}/tweets/${action.payload.idDB}/`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      
      if (response.status <= 300) {
        yield put(actions.completeRemovingTweet(action.payload));
        

      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error al eliminar el tweet.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failRemovingTweet({...action.payload,errorMessage}));
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
        yield put(actions.completeRemovingTweet({...action.payload}));
        

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
          actions.completeFetchingTweetsHome(
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