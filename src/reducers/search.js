import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/search';


//Search Users
const searchUsersById = (state = {}, action) => {
  switch(action.type) {
    case types.SEARCH_USERS_FETCH_COMPLETED: {
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
    case types.SEARCH_USERS_CLEAR: {
      const newState = {}
      return newState;
    } 
    default: {
      return state;
    }
  }
};

const searchUsersOrder = (state = [], action) => {
  switch(action.type) {
    case types.SEARCH_USERS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.SEARCH_USERS_CLEAR: {
      const newState = []
      return newState;
    } 
    default: {
      return state;
    }
  }
};


//Search Tweets
const searchTweetsById = (state = {}, action) => {
  switch(action.type) {
    case types.SEARCH_TWEETS_FETCH_COMPLETED: {
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
    case types.SEARCH_TWEETS_CLEAR: {
      const newState = {}
      return newState;
    } 
    default: {
      return state;
    }
  }
};

const searchTweetsOrder = (state = [], action) => {
  switch(action.type) {
    case types.SEARCH_TWEETS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.SEARCH_TWEETS_CLEAR: {
      const newState = []
      return newState;
    } 
    default: {
      return state;
    }
  }
};

//Search Users
const isFetchingSearchUsers = (state = false, action)=>{
  switch(action.type) {
    case types.SEARCH_USERS_FETCH_STARTED: {
      return true;
    }
    case types.SEARCH_USERS_FETCH_COMPLETED: {
      return false;
    }
    case types.SEARCH_USERS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

//SearchTweets
const isFetchingSearchTweets = (state = false, action)=>{
  switch(action.type) {
    case types.SEARCH_TWEETS_FETCH_STARTED: {
      return true;
    }
    case types.SEARCH_TWEETS_FETCH_COMPLETED: {
      return false;
    }
    case types.SEARCH_TWEETS_FETCH_FAILED: {
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
    case types.SEARCH_USERS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.SEARCH_USERS_FETCH_STARTED: {
      return null;
    }
    case types.SEARCH_USERS_FETCH_COMPLETED: {
      return null;
    }
    //Search Tweets
    case types.SEARCH_TWEETS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.SEARCH_TWEETS_FETCH_STARTED: {
      return null;
    }
    case types.SEARCH_TWEETS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  searchUsersById,
  searchUsersOrder,
  searchTweetsById,
  searchTweetsOrder,
  isFetchingSearchUsers,
  isFetchingSearchTweets,
  error,
});


export const getSearchUser = (state, id) => state.searchUsersById[id];
export const getSearchUsers = state => state.searchUsersOrder.map(id => getSearchUser(state, id));
export const getSearchTweet = (state, id) => state.searchTweetsById[id];
export const getSearchTweets = state => state.searchTweetsOrder.map(id => getSearchTweet(state, id));
export const isSearchUsersFetching = state => state.isFetchingSearchUsers;
export const isSearchTweetsFetching = state => state.isFetchingSearchTweets;
export const getSearchFetchingError = state => state.error;
