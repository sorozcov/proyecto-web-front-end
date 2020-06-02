/* -------------------------------------------------------------------------- */
/*                            Reducer Notifications                           */
/* -------------------------------------------------------------------------- */
// Este reducer contiene toda la información de las notificaciones del usuario en sesión.

import { combineReducers } from 'redux';
import * as types from '../types/notifications';


//Notifications retweets
const retweetsById = (state = {}, action) => {
  switch(action.type) {
    case types.NOTIFICATIONS_RETWEETS_FETCH_COMPLETED: {
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
    case types.NOTIFICATIONS_RETWEETS_CLEAR: {
      const newState = {}
      return newState;
    } 
    default: {
      return state;
    }
  }
};

const retweetsOrder = (state = [], action) => {
  switch(action.type) {
    case types.NOTIFICATIONS_RETWEETS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.NOTIFICATIONS_RETWEETS_CLEAR: {
      const newState = []
      return newState;
    } 
    default: {
      return state;
    }
  }
};

//Notifications comments
const commentsById = (state = {}, action) => {
  switch(action.type) {
    case types.NOTIFICATIONS_COMMENTS_FETCH_COMPLETED: {
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
    case types.NOTIFICATIONS_COMMENTS_CLEAR: {
      const newState = {}
      return newState;
    } 
    default: {
      return state;
    }
  }
};

const commentsOrder = (state = [], action) => {
  switch(action.type) {
    case types.NOTIFICATIONS_COMMENTS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.NOTIFICATIONS_COMMENTS_CLEAR: {
      const newState = []
      return newState;
    } 
    default: {
      return state;
    }
  }
};

//Notifications likes
const likesById = (state = {}, action) => {
  switch(action.type) {
    case types.NOTIFICATIONS_LIKES_FETCH_COMPLETED: {
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
    case types.NOTIFICATIONS_LIKES_CLEAR: {
      const newState = {}
      return newState;
    } 
    default: {
      return state;
    }
  }
};

const likesOrder = (state = [], action) => {
  switch(action.type) {
    case types.NOTIFICATIONS_LIKES_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.NOTIFICATIONS_LIKES_CLEAR: {
      const newState = []
      return newState;
    } 
    default: {
      return state;
    }
  }
};

//Notifications Retweets
const isFetchingNotificationsRetweets = (state = false, action)=>{
  switch(action.type) {
    case types.NOTIFICATIONS_RETWEETS_FETCH_STARTED: {
      return true;
    }
    case types.NOTIFICATIONS_RETWEETS_FETCH_COMPLETED: {
      return false;
    }
    case types.NOTIFICATIONS_RETWEETS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

//Notifications Comments
const isFetchingNotificationsComments = (state = false, action)=>{
  switch(action.type) {
    case types.NOTIFICATIONS_COMMENTS_FETCH_STARTED: {
      return true;
    }
    case types.NOTIFICATIONS_COMMENTS_FETCH_COMPLETED: {
      return false;
    }
    case types.NOTIFICATIONS_COMMENTS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

//Notifications Likes
const isFetchingNotificationsLikes = (state = false, action)=>{
  switch(action.type) {
    case types.NOTIFICATIONS_LIKES_FETCH_STARTED: {
      return true;
    }
    case types.NOTIFICATIONS_LIKES_FETCH_COMPLETED: {
      return false;
    }
    case types.NOTIFICATIONS_LIKES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

const error = (state = null, action) => {
  switch(action.type) {
    //Notifications Retweets
    case types.NOTIFICATIONS_RETWEETS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.NOTIFICATIONS_RETWEETS_FETCH_STARTED: {
      return null;
    }
    case types.NOTIFICATIONS_RETWEETS_FETCH_COMPLETED: {
      return null;
    }
    //Notifications Comments
    case types.NOTIFICATIONS_COMMENTS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.NOTIFICATIONS_COMMENTS_FETCH_STARTED: {
      return null;
    }
    case types.NOTIFICATIONS_COMMENTS_FETCH_COMPLETED: {
      return null;
    }
    //Notifications Likes
    case types.NOTIFICATIONS_LIKES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.NOTIFICATIONS_LIKES_FETCH_STARTED: {
      return null;
    }
    case types.NOTIFICATIONS_LIKES_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  retweetsById,
  retweetsOrder,
  commentsById,
  commentsOrder,
  likesById,
  likesOrder,
  isFetchingNotificationsRetweets,
  isFetchingNotificationsComments,
  isFetchingNotificationsLikes,
  error,
});


export const getNotificationsRetweet = (state, id) => state.retweetsById[id];
export const getNotificationsRetweets = state => state.retweetsOrder.map(id => getNotificationsRetweet(state, id));
export const getNotificationsComment = (state, id) => state.commentsById[id];
export const getNotificationsComments = state => state.commentsOrder.map(id => getNotificationsComment(state, id));
export const getNotificationsLike = (state, id) => state.likesById[id];
export const getNotificationsLikes = state => state.likesOrder.map(id => getNotificationsLike(state, id));
export const isNotificationsRetweetsFetching = state => state.isFetchingNotificationsRetweets;
export const isNotificationsCommentsFetching = state => state.isFetchingNotificationsComments;
export const isNotificationsLikesFetching = state => state.isFetchingNotificationsLikes;
export const getNotificationsFetchingError = state => state.error;
