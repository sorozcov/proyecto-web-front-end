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
import randomString from 'random-string';

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

//User Messages
function* addUserMessages(action) {
  
  const oldId = action.payload.chat;
  const userId2 = action.payload.userid;
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/chats/`,
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
     
      if (response.status <= 300) {
        const jsonResult = yield response.json();
        const chatId = jsonResult.id;
        const userId = yield select(selectors.getAuthUserID);
        
        const responseChatUser1 = yield call(
          fetch,
          `${API_BASE_URL}/chatUsers/`,
          {
            method: 'POST',
            body: JSON.stringify({ chat: chatId, user: userId}),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );

        if (responseChatUser1.status <= 300) {
          const responseChatUser2 = yield call(
            fetch,
            `${API_BASE_URL}/chatUsers/`,
            {
              method: 'POST',
              body: JSON.stringify({ chat: chatId, user: userId2}),
              headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
              },
            }
          );
  
          if (responseChatUser2.status <= 300) {
            action.payload.chat = chatId;
  
            yield put(
              actions.completeAddingChatUsersMessages(
                oldId,
                action.payload,
              ),
            );          
            
            const id = randomString();
            const date = action.payload.date;
            const content = action.payload.content;

            yield put(actions.startAddingChatMessage({ id, date, content, chat:chatId, sender:{ is_me:true } }));
            
          } else {
            const { detail } = yield response.json();
            let errorMessage ="Error guardando el chat.";
            if(detail!=undefined){errorMessage=detail}
            yield put(actions.failAddingChatUsersMessages(oldId,errorMessage));
          }
        } else {
        const { detail } = yield response.json();
        let errorMessage ="Error guardando el chat.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failAddingChatUsersMessages(oldId,errorMessage));
        }
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error guardando el chat.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failAddingChatUsersMessages(oldId,errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failAddingChatUsersMessages(oldId, errorMessage));
  }
}

export function* watchUserMessagesAdd() {
  yield takeEvery(
    types.CHAT_USER_MESSAGES_ADD_STARTED,
    addUserMessages,
  );
}

//Chat Messages
function* addChatMessages(action) {
  
  const oldId = action.payload.id;
  const user = yield select(selectors.getAuthUserInformation);
  const date = action.payload.date;
  const content = action.payload.content;
  const chatId = action.payload.chat;
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/messages/`,
        {
          method: 'POST',
          body: JSON.stringify({ chat: chatId, sender: user.id, content: content, date: date }),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      if (response.status <= 300) {
        const jsonResult = yield response.json();
        const messageId = jsonResult.id;
        action.payload.id = messageId;
        action.payload.sender = { id:user.id, username:user.username, first_name:user.first_name, is_me:true }

        yield put(
          actions.completeAddingChatMessage(
            oldId,
            action.payload,
          )
        );
      } else {
        const { detail } = yield response.json();
        let errorMessage ="Error guardando el mensaje.";
        if(detail!=undefined){errorMessage=detail}
        yield put(actions.failAddingChatMessage(oldId,errorMessage));

      }
    }
  } catch (error) {
    console.log("ERROR", error)
    let errorMessage ="Error en la conexión.";
    yield put(actions.failAddingChatMessage(oldId, errorMessage));
  }
}

export function* watchChatMessagesAdd() {
  yield takeEvery(
    types.CHAT_MESSAGES_ADD_STARTED,
    addChatMessages,
  );
}
