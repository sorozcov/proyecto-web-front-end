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
import * as actions from '../actions/chat';
import * as types from '../types/chat';
import * as schemas from '../schemas/chat';


//User Messages
function* fetchUserMessages(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const userId = yield select(selectors.getAuthUserID);
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/${userId}/messages/`,
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
          entities: { userMessages },
          result,
        } = normalize(jsonResult, schemas.userMessages);
        yield put(
          actions.completeFetchingChatUserMessages(
            userMessages,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo los chats del usuario.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingChatUserMessages(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingChatUserMessages(errorMessage));
  }
}

export function* watchUserMessagesFetch() {
  yield takeEvery(
    types.CHAT_USER_MESSAGES_FETCH_STARTED,
    fetchUserMessages,
  );
}

//Chat Messages
function* fetchChatMessages(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const chatId = action.payload;
   
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/chats/${chatId}/chatMessages/`,
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
          entities: { chatMessages },
          result,
        } = normalize(jsonResult, schemas.chatMessages);
       
        yield put(
          actions.completeFetchingChatMessages(
            chatMessages,
            result,
          ),
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error obteniendo los mensajes del chat.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failFetchingChatMessages(errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failFetchingChatMessages(errorMessage));
  }
}

export function* watchChatMessagesFetch() {
  yield takeEvery(
    types.CHAT_MESSAGES_FETCH_STARTED,
    fetchChatMessages,
  );
}
