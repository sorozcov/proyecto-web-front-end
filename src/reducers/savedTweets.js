import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/tweets';
import * as typesTweetSelected from '../types/tweetSelected'

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.TWEETS_SAVED_FETCH_COMPLETED: {
      console.log('lleog')
      console.log(action.payload)
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

    case types.TWEET_REMOVE_COMPLETED: {
      if(state[action.payload.id]){
        return omit(state, action.payload.id);
      }
      return state;
    }
    

    case types.TWEET_REMOVE_STARTED: {
      const newState = { ...state };
      if(newState[action.payloadId]){
        newState[action.payload.id] = {
          ...newState[action.payload.id],
          isConfirmed: false,
        };
        return newState;
      }
      return newState;
    }
    
    case types.TWEET_REMOVE_FAILED: {
      const newState = {...state};
      if(newState[id]){
        newState[id] = {
          ...newState[id],
          isConfirmed: true,
        };
      }
      return newState;
    }

    case types.TWEET_LIKE_STARTED: {
      
      const newState = {...state};
      const { id,is_liked } = action.payload;
      if(newState[id]){
        if(!is_liked){
          newState[id].data.likes +=1
        }else{
          newState[id].data.likes -=1
        }
        newState[id].data.is_liked = !is_liked;
        
      } 
      return newState;
    }

    case types.TWEET_LIKE_FAILED: {
      const newState = {...state};
      const { id,is_liked } = action.payload;
      if(newState[id]){
        if(!is_liked){
          newState[id].data.likes -=1
        }else{
          newState[id].data.likes +=1
        }
        newState[id].data.is_liked = is_liked;
      }
      return newState;
    }

    case types.TWEET_RETWEET_STARTED: {
      const newState = {...state};
      const { id,is_retweeted } = action.payload;
      if(newState[id]){
        if(!is_retweeted){
          newState[id].data.retweets +=1
        }else{
          newState[id].data.retweets -=1
        }
        newState[id].data.is_retweeted = !is_retweeted;
      }
      return newState;
    }

    case types.TWEET_RETWEET_FAILED: {
      const newState = {...state};
      const { id,is_retweeted } = action.payload;
      if(newState[id]){
        if(!is_retweeted){
          newState[id].data.retweets -=1
        }else{
          newState[id].data.retweets +=1
        }
        newState[id].data.is_retweeted = is_retweeted;
      }
      return newState;
    }

    case types.TWEET_SAVE_TWEET_STARTED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = !is_saved;
      }
      return newState;
    }

    case types.TWEET_SAVE_TWEET_FAILED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = is_saved;
      }
      return newState;
    }

    case types.TWEET_COMMENT_STARTED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id].data.comments +=1;
      }
      return newState;
    }

    case types.TWEET_COMMENT_FAILED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id].data.comments +=1;
      }
      return newState;
    }

    case typesTweetSelected.TWEET_COMMENT_ADD_STARTED: {
      
      const newState = {...state};
      const comment  = action.payload;
      let id= 'tweet-' + comment.tweet.id;
      if(newState[id]){
          newState[id].data.comments +=1
      }
      return newState;
    }

    case typesTweetSelected.TWEET_COMMENT_ADD_FAILED: {
      const newState = {...state};
      const {comment}  = action.payload;
      let id= 'tweet-' + comment.tweet.id;
      if(newState[id]){
          newState[id].data.comments -=1
      }
      return newState;
    }

    case typesTweetSelected.TWEET_COMMENT_REMOVE_STARTED: {
      
      const newState = {...state};
      const { comment } = action.payload;
      let id= 'tweet-' + comment.tweet.id;
      if(newState[id]){
          newState[id].data.comments -=1
      }
      return newState;
    }

    case typesTweetSelected.TWEET_COMMENT_REMOVE_FAILED: {
      const newState = {...state};
      const { comment } = action.payload;
      let id= 'tweet-' + comment.tweet.id;
      if(newState[id]){
          newState[id].data.comments +=1
      }
      return newState;
    }
 
    
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.TWEETS_SAVED_FETCH_COMPLETED: {
      return [...action.payload.order];
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
    case types.TWEETS_SAVED_FETCH_STARTED: {
      return true;
    }
    case types.TWEETS_SAVED_FETCH_COMPLETED: {
      return false;
    }
    case types.TWEETS_SAVED_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.TWEETS_SAVED_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TWEETS_SAVED_FETCH_STARTED: {
      return null;
    }
    case types.TWEETS_SAVED_FETCH_COMPLETED: {
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
