import { schema } from 'normalizr';

//User Messages
export const userMessage = new schema.Entity(
  'userMessages',
  {},
  {
    idAttribute: 'chat',
  }
);
export const userMessages = new schema.Array(userMessage);

//Chat Messages
export const chatMessage = new schema.Entity(
  'chatMessages',
);
export const chatMessages = new schema.Array(chatMessage);
