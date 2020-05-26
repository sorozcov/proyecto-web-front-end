import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/tweets';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.TWEETS_HOME_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = {  };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });

      return newState;
    }
    case types.TWEET_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TWEET_ADD_COMPLETED: {
      const { oldId, tweet } = action.payload;
      const newState = omit(state, oldId);
      newState[tweet.id] = {
        ...tweet,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TWEET_REMOVE_COMPLETED: {
      return omit(state, action.payload.id);
    }
    case types.TWEET_REMOVE_STARTED: {
      const { id } = action.payload;
      const newState = state;
      newState[id] = {
        ...newState[id]['tweet'],
        isConfirmed: false,
      };
    }
    case types.TWEET_REMOVE_FAILED: {
      const newState = state;
      newState[id] = {
        ...newState[id]['tweet'],
        isConfirmed: true,
      };
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.TWEETS_HOME_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.TWEET_ADD_STARTED: {
      return [action.payload.id,...state ];
    }
    case types.TWEET_ADD_COMPLETED: {
      const { oldId, tweet } = action.payload;
      return state.map(id => id === oldId ? tweet.id : id);
    }
    case types.TWEET_ADD_FAILED: {
      const { oldId } = action.payload;
      return state.map(id => id !== oldId);
    }
    case types.TWEET_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.TWEETS_HOME_FETCH_STARTED: {
      return true;
    }
    case types.TWEETS_HOME_FETCH_COMPLETED: {
      return false;
    }
    case types.TWEETS_HOME_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.TWEETS_HOME_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TWEETS_HOME_FETCH_STARTED: {
      return null;
    }
    case types.TWEETS_HOME_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getTweet = (state, id) => state.byId[id];
export const getTweets = state => state.order.map(id => getTweet(state, id));
export const isFetchingTweets = state => state.isFetching;
export const getFetchingTweetsError = state => state.error;
