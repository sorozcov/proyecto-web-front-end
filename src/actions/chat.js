import * as types from '../types/chat';


export const startFetchingChatUserMessages = () => ({
  type: types.CHAT_USER_MESSAGES_FETCH_STARTED,
});

export const completeFetchingChatUserMessages = (entities, order) => ({
  type: types.CHAT_USER_MESSAGES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingChatUserMessages = error => ({
  type: types.CHAT_USER_MESSAGES_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingChatMessages = chatId => ({
  type: types.CHAT_MESSAGES_FETCH_STARTED,
  payload: chatId,
});

export const completeFetchingChatMessages = (entities, order) => ({
  type: types.CHAT_MESSAGES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingChatMessages = error => ({
  type: types.CHAT_MESSAGES_FETCH_FAILED,
  payload: {
    error,
  },
});

export const clearChatMessages = () => ({
  type: types.CHAT_MESSAGES_CLEAR,
});
