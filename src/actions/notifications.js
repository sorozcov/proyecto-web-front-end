/* -------------------------------------------------------------------------- */
/*                     Acciones del reductor Notifications                    */
/* -------------------------------------------------------------------------- */

import * as types from '../types/notifications';


export const startFetchingNotificationsRetweets = () => ({
  type: types.NOTIFICATIONS_RETWEETS_FETCH_STARTED,
});

export const completeFetchingNotificationsRetweets = (entities, order) => ({
  type: types.NOTIFICATIONS_RETWEETS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingNotificationsRetweets = error => ({
  type: types.NOTIFICATIONS_RETWEETS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const clearNotificationsRetweets = () => ({
  type: types.NOTIFICATIONS_RETWEETS_CLEAR,
});

export const startFetchingNotificationsComments = () => ({
  type: types.NOTIFICATIONS_COMMENTS_FETCH_STARTED,
});

export const completeFetchingNotificationsComments = (entities, order) => ({
  type: types.NOTIFICATIONS_COMMENTS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingNotificationsComments = error => ({
  type: types.NOTIFICATIONS_COMMENTS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const clearNotificationsComments = () => ({
  type: types.NOTIFICATIONS_COMMENTS_CLEAR,
});

export const startFetchingNotificationsLikes = () => ({
  type: types.NOTIFICATIONS_LIKES_FETCH_STARTED,
});

export const completeFetchingNotificationsLikes = (entities, order) => ({
  type: types.NOTIFICATIONS_LIKES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingNotificationsLikes = error => ({
  type: types.NOTIFICATIONS_LIKES_FETCH_FAILED,
  payload: {
    error,
  },
});

export const clearNotificationsLikes = () => ({
  type: types.NOTIFICATIONS_LIKES_CLEAR,
}); 

