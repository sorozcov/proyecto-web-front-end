/* -------------------------------------------------------------------------- */
/*                              Reducer Comments                              */
/* -------------------------------------------------------------------------- */
// Este reducer contiene toda la información de los comentarios de un tweet.

import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/tweetSelected';


//Comments
const tweetCommentsById = (state = {}, action) => {
  switch(action.type) {
    case types.TWEET_COMMENTS_FETCH_COMPLETED: {
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
    case types.TWEET_COMMENT_ADD_STARTED: {
      const newState = { ...state };
      
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TWEET_COMMENT_ADD_COMPLETED: {
      const { oldId, comment } = action.payload;
      const newState = omit(state, oldId);
      newState[comment.id] = {
        ...comment,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TWEET_COMMENT_ADD_FAILED: {
      if(state[action.payload.oldId]){
        return omit(state, action.payload.oldId);
      }
      return state;
    }

    case types.TWEET_COMMENT_REMOVE_COMPLETED: {
      if(state[action.payload.oldId]){
        return omit(state, action.payload.oldId);
      }
      return state;
    }
    

    case types.TWEET_COMMENT_REMOVE_STARTED: {
      const newState = { ...state };
      if(newState[action.payload.id]){
        newState[action.payload.id] = {
          ...newState[action.payload.id],
          isConfirmed: false,
        };
     }
      return newState;
    }
    
    case types.TWEET_COMMENT_REMOVE_FAILED: {
      const newState = {...state};
      const { oldId } = action.payload;
      if(newState[oldId]){
        newState[oldId] = {
          ...newState[oldId],
          isConfirmed: true,
        };
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

const tweetCommentsOrder = (state = [], action) => {
  switch(action.type) {
    case types.TWEET_COMMENTS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.TWEET_COMMENT_ADD_STARTED: {
      return [action.payload.id,...state ];
    }
    case types.TWEET_COMMENT_ADD_COMPLETED: {
      const { oldId, comment } = action.payload;
      return state.map(id => id === oldId ? comment.id : id);
    }
    case types.TWEET_COMMENT_ADD_FAILED: {
      const { oldId } = action.payload;
      return state.map(id => id !== oldId);
    }
    case types.TWEET_COMMENT_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload.oldId);
    }
    default: {
      return state;
    }
  }
};



const isFetchingComments = (state = false, action) => {
  switch(action.type) {
    //Profile Information
    case types.TWEET_COMMENTS_FETCH_STARTED: {
      return true;
    }
    case types.TWEET_COMMENTS_FETCH_COMPLETED: {
      return false;
    }
    case types.TWEET_COMMENTS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    //TWEET INFO
    case types.TWEET_INFO_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TWEET_INFO_FETCH_STARTED: {
      return null;
    }
    case types.TWEET_INFO_FETCH_COMPLETED: {
      return null;
    }
 
     //USER likes
     case types.TWEET_LIKES_USERS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TWEET_LIKES_USERS_FETCH_STARTED: {
      return null;
    }
    case types.TWEET_LIKES_USERS_FETCH_COMPLETED: {
      return null;
    }
    //USER RETWEETS
    case types.TWEET_RETWEET_USERS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TWEET_RETWEET_USERS_FETCH_STARTED: {
      return null;
    }
    case types.TWEET_RETWEET_USERS_FETCH_COMPLETED: {
      return null;
    }
    //TWEET COMMENTS
    case types.TWEET_COMMENTS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TWEET_COMMENTS_FETCH_STARTED: {
      return null;
    }
    case types.TWEET_COMMENTS_FETCH_COMPLETED: {
      return null;
    }
    //TWEET COMMENT ADDED
    case types.TWEET_COMMENT_ADD_FAILED: {
      return action.payload.error;
    }
    case types.TWEET_COMMENT_ADD_STARTED: {
      return null;
    }
    case types.TWEET_COMMENT_ADD_COMPLETED: {
      return null;
    }

    //TWEET COMMENT REMOVED
    case types.TWEET_COMMENT_REMOVE_FAILED: {
      return action.payload.error;
    }
    case types.TWEET_COMMENT_REMOVE_STARTED: {
      return null;
    }
    case types.TWEET_COMMENT_REMOVE_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  tweetCommentsById,
  tweetCommentsOrder,
  isFetchingComments,
  error,
});



export const getTweetComment = (state, id) => state.tweetCommentsById[id];
export const getTweetComments = state => state.tweetCommentsOrder.map(id => getTweetComment(state, id));
export const isTweetFetchingComments = state => state.isFetchingComments;

export const getErrorTweetSelectedComments = state => state.error;
