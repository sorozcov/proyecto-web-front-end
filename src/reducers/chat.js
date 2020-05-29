import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/chat';


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
    case types.CHAT_MESSAGES_CLEAR: {
      const newState = []
      return newState;
    } 
    default: {
      return state;
    }
  }
};

//Search Users
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

//SearchTweets
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
    default: {
      return state;
    }
  }
};


export default combineReducers({
  UserMessagesById,
  UserMessagesOrder,
  ChatMessagesById,
  ChatMessagesOrder,
  isFetchingUserMessages,
  isFetchingChatMessages,
  error,
});


export const getUserMessage = (state, id) => state.UserMessagesById[id];
export const getUserMessages = state => state.UserMessagesOrder.map(id => getUserMessage(state, id));
export const getChatMessage = (state, id) => state.ChatMessagesById[id];
export const getChatMessages = state => state.ChatMessagesOrder.map(id => getChatMessage(state, id));
export const isUserMessagesFetching = state => state.isFetchingUserMessages;
export const isChatMessagesFetching = state => state.isFetchingChatMessages;
export const getChatFetchingError = state => state.error;
export const getUserMessageInfoBySelectedUser = (state, id) => (getUserMessages(state).filter(userMessage => userMessage.userid === id));
