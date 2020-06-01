import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/tweetSelected';
import * as tweetTypes from '../types/tweets'

//Tw
const tweetSelectedId = (state = null, action) => {
  switch(action.type) {
    case types.TWEET_ID_SELECTED: {
      return action.payload.id;
    }
  }
  return state;
};

//Tweet Information
const tweetInfo = (state = null, action) => {
  switch(action.type) {
    case types.TWEET_ID_SELECTED: {
      return action.payload.tweet;
    }
    case types.TWEET_INFO_FETCH_STARTED: {
      return null;
    }
    case types.TWEET_INFO_FETCH_COMPLETED: {
      return action.payload.profile;
    }
  }
  return state;
};

//Likes Users
const userLikesById = (state = {}, action) => {
  switch(action.type) {
    case types.TWEET_LIKES_USERS_FETCH_COMPLETED: {
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

const userLikesOrder = (state = [], action) => {
  switch(action.type) {
    case types.TWEET_LIKES_USERS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    default: {
      return state;
    }
  }
};


//Retweet Users
const userRetweetById = (state = {}, action) => {
  switch(action.type) {
    case types.TWEET_RETWEETS_USERS_FETCH_COMPLETED: {
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

const userRetweetOrder = (state = [], action) => {
  switch(action.type) {
    case types.TWEET_RETWEETS_USERS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    default: {
      return state;
    }
  }
};





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

const isFetchingLikeUsers = (state = false, action)=>{
  switch(action.type) {


    
    //Profile liked tweets
    case types.TWEET_LIKES_USERS_FETCH_STARTED: {
      return true;
    }
    case types.TWEET_LIKES_USERS_FETCH_COMPLETED: {
      return false;
    }
    case types.TWEET_LIKES_USERS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

const isFetchingRetweetUsers = (state = false, action)=>{
  switch(action.type) {

    //Profile liked tweets
    case types.TWEET_RETWEET_USERS_FETCH_STARTED: {
      return true;
    }
    case types.TWEET_RETWEET_USERS_FETCH_COMPLETED: {
      return false;
    }
    case types.TWEET_RETWEET_USERS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

const isFetchingInfo = (state = false, action) => {
  switch(action.type) {
    //Profile Information
    case types.TWEET_INFO_FETCH_STARTED: {
      return true;
    }
    case types.TWEET_INFO_FETCH_COMPLETED: {
      return false;
    }
    case types.TWEET_INFO_FETCH_FAILED: {
      return false;
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
  tweetSelectedId,
  tweetInfo,
  userLikesById,
  userLikesOrder,
  userRetweetById,
  userRetweetOrder,
  tweetCommentsById,
  tweetCommentsOrder,
  isFetchingLikeUsers,
  isFetchingRetweetUsers,
  isFetchingInfo,
  isFetchingComments,
  error,
});


export const getTweetSelectedId = state => state.tweetSelectedId ? state.tweetSelectedId : null;
export const getTweetInfo = state => state.tweetInfo ? state.tweetInfo : null;

export const getLikeUser = (state, id) => state.userLikesById[id];
export const getLikeUsers = state => state.userLikesOrder.map(id => getLikeUser(state, id));

export const geRetweetUser = (state, id) => state.userRetweetById[id];
export const getRetweetUsers = state => state.userRetweetOrder.map(id => geRetweetUser(state, id));

export const getTweetComment = (state, id) => state.tweetCommentsById[id];
export const getTweetComments = state => state.tweetCommentsOrder.map(id => getTweetComment(state, id));

export const isTweetFetchingInfo = state => state.isFetchingInfo;
export const isTweetFetchingLikeUsers = state => state.isFetchingLikeUsers;
export const isTweetFetchingRetwetUsers = state => state.isFetchingRetweetUsers;
export const isTweetFetchingComments = state => state.isFetchingComments;

export const getErrorTweetSelected = state => state.error;
