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

export const startAddingChatUsersMessages = chat => ({
  type: types.CHAT_USER_MESSAGES_ADD_STARTED,
  payload: chat,
});

export const completeAddingChatUsersMessages = (oldId, chat) => ({
  type: types.CHAT_USER_MESSAGES_ADD_COMPLETED,
  payload: {
    oldId,
    chat,
  },
});

export const failAddingChatUsersMessages = (oldId, error) => ({
  type: types.CHAT_USER_MESSAGES_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startAddingChatMessage = message => ({
  type: types.CHAT_MESSAGES_ADD_STARTED,
  payload: message,
});

export const completeAddingChatMessage = (oldId, message) => ({
  type: types.CHAT_MESSAGES_ADD_COMPLETED,
  payload: {
    oldId,
    message,
  },
});

export const failAddingChatMessage = (oldId, error) => ({
  type: types.CHAT_MESSAGES_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const updateChatUserMessage = chat => ({
  type: types.CHAT_USER_MESSAGES_UPDATE,
  payload: chat,
});

export const selectChatUserMessage = chat => ({
  type: types.CHAT_USER_MESSAGES_SELECT,
  payload: chat,
});

export const deselectChatUserMessage = () => ({
  type: types.CHAT_USER_MESSAGES_DESELECT,
});