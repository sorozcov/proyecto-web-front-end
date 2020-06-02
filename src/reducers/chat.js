/* -------------------------------------------------------------------------- */
/*                                Reducer Chat                                */
/* -------------------------------------------------------------------------- */
// Este reducer contiene toda la información de un chat con un usuario en específico.

import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/chat';


const SelectedUserMessage = (state = null, action) => {
  switch(action.type) {
    case types.CHAT_USER_MESSAGES_SELECT: {
      return action.payload;
    }
    case types.CHAT_USER_MESSAGES_DESELECT: {
      return null;
    }
    default: {
      return state;
    }
  }
}

//User Messages
const UserMessagesById = (state = {}, action) => {
  switch(action.type) {
    case types.CHAT_USER_MESSAGES_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = {};
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.CHAT_USER_MESSAGES_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.chat] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.CHAT_USER_MESSAGES_ADD_COMPLETED: {
      const { oldId, chat } = action.payload;
      const newState = omit(state, oldId);
      newState[chat.chat] = {
        ...chat,
        isConfirmed: true,
      };
      return newState;
    }
    case types.CHAT_USER_MESSAGES_ADD_FAILED: {
      const { oldId } = action.payload;
      const newState = omit(state, oldId);
      return newState;
    }
    case types.CHAT_USER_MESSAGES_UPDATE: {
      return {
        ...state,
        [action.payload.chat]: {
          ...state[action.payload.chat],
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const UserMessagesOrder = (state = [], action) => {
  switch(action.type) {
    case types.CHAT_USER_MESSAGES_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.CHAT_USER_MESSAGES_ADD_STARTED: {
      return [action.payload.chat,...state ];
    }
    case types.CHAT_USER_MESSAGES_ADD_COMPLETED: {
      const { oldId, chat } = action.payload;
      return state.map(id => id === oldId ? chat.chat : id);
    }
    case types.CHAT_USER_MESSAGES_ADD_FAILED: {
      const { oldId } = action.payload;
      return state.filter(id => id !== oldId);
    }
    default: {
      return state;
    }
  }
};


//Chat Messages
const ChatMessagesById = (state = {}, action) => {
  switch(action.type) {
    case types.CHAT_MESSAGES_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = {};
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.CHAT_MESSAGES_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.CHAT_MESSAGES_ADD_COMPLETED: {
      const { oldId, message } = action.payload;
      const newState = omit(state, oldId);
      newState[message.id] = {
        ...message,
        isConfirmed: true,
      };
      return newState;
    }
    case types.CHAT_MESSAGES_ADD_FAILED: {
      const { oldId } = action.payload;
      const newState = omit(state, oldId);
      return newState;
    }
    case types.CHAT_MESSAGES_CLEAR: {
      const newState = {}
      return newState;
    } 
    default: {
      return state;
    }
  }
};

const ChatMessagesOrder = (state = [], action) => {
  switch(action.type) {
    case types.CHAT_MESSAGES_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.CHAT_MESSAGES_ADD_STARTED: {
      return [action.payload.id,...state ];
    }
    case types.CHAT_MESSAGES_ADD_COMPLETED: {
      const { oldId, message } = action.payload;
      return state.map(id => id === oldId ? message.id : id);
    }
    case types.CHAT_MESSAGES_ADD_FAILED: {
      const { oldId } = action.payload;
      return state.filter(id => id !== oldId);
    }
    case types.CHAT_MESSAGES_CLEAR: {
      const newState = []
      return newState;
    } 
    default: {
      return state;
    }
  }
};

//user messages
const isFetchingUserMessages = (state = false, action)=>{
  switch(action.type) {
    case types.CHAT_USER_MESSAGES_FETCH_STARTED: {
      return true;
    }
    case types.CHAT_USER_MESSAGES_FETCH_COMPLETED: {
      return false;
    }
    case types.CHAT_USER_MESSAGES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

//Chat messages
const isFetchingChatMessages = (state = false, action)=>{
  switch(action.type) {
    case types.CHAT_MESSAGES_FETCH_STARTED: {
      return true;
    }
    case types.CHAT_MESSAGES_FETCH_COMPLETED: {
      return false;
    }
    case types.CHAT_MESSAGES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

//user messages
const isAddingUserMessages = (state = false, action)=>{
  switch(action.type) {
    case types.CHAT_USER_MESSAGES_ADD_STARTED: {
      return true;
    }
    case types.CHAT_USER_MESSAGES_ADD_COMPLETED: {
      return false;
    }
    case types.CHAT_USER_MESSAGES_ADD_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

//Chat messages
const isAddingChatMessages = (state = false, action)=>{
  switch(action.type) {
    case types.CHAT_MESSAGES_ADD_STARTED: {
      return true;
    }
    case types.CHAT_MESSAGES_ADD_COMPLETED: {
      return false;
    }
    case types.CHAT_MESSAGES_ADD_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

const error = (state = null, action) => {
  switch(action.type) {
    //Search Users
    case types.CHAT_USER_MESSAGES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.CHAT_USER_MESSAGES_FETCH_STARTED: {
      return null;
    }
    case types.CHAT_USER_MESSAGES_FETCH_COMPLETED: {
      return null;
    }
    //Search Tweets
    case types.CHAT_MESSAGES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.CHAT_MESSAGES_FETCH_STARTED: {
      return null;
    }
    case types.CHAT_MESSAGES_FETCH_COMPLETED: {
      return null;
    }
    //Search Tweets
    case types.CHAT_USER_MESSAGES_ADD_FAILED: {
      return action.payload.error;
    }
    case types.CHAT_USER_MESSAGES_ADD_STARTED: {
      return null;
    }
    case types.CHAT_USER_MESSAGES_ADD_COMPLETED: {
      return null;
    }
    //Search Tweets
    case types.CHAT_MESSAGES_ADD_FAILED: {
      return action.payload.error;
    }
    case types.CHAT_MESSAGES_ADD_STARTED: {
      return null;
    }
    case types.CHAT_MESSAGES_ADD_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  SelectedUserMessage,
  UserMessagesById,
  UserMessagesOrder,
  ChatMessagesById,
  ChatMessagesOrder,
  isFetchingUserMessages,
  isFetchingChatMessages,
  isAddingUserMessages,
  isAddingChatMessages,
  error,
});


export const getSelectedUserMessage = (state) => state.SelectedUserMessage;
export const getUserMessage = (state, id) => state.UserMessagesById[id];
export const getUserMessages = state => state.UserMessagesOrder.map(id => getUserMessage(state, id));
export const getChatMessage = (state, id) => state.ChatMessagesById[id];
export const getChatMessages = state => state.ChatMessagesOrder.map(id => getChatMessage(state, id));
export const isUserMessagesFetching = state => state.isFetchingUserMessages;
export const isChatMessagesFetching = state => state.isFetchingChatMessages;
export const isUserMessagesAdding = state => state.isAddingUserMessages;
export const isChatMessagesAdding = state => state.isAddingChatMessages;
export const getChatFetchingError = state => state.error;
export const getUserMessageInfoBySelectedUser = (state, id) => (getUserMessages(state).filter(userMessage => userMessage.userid === id));
