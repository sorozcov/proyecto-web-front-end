import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/search';
import * as typesTweet from '../types/tweets';
import * as typesTweetSelected from '../types/tweetSelected'

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

    case typesTweet.TWEET_REMOVE_COMPLETED: {
      if(state[action.payload.id]){
        return omit(state, action.payload.id);
      }
      return state;
    }
    

    case typesTweet.TWEET_REMOVE_STARTED: {
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
    
    case typesTweet.TWEET_REMOVE_FAILED: {
      const newState = {...state};
      if(newState[id]){
        newState[id] = {
          ...newState[id],
          isConfirmed: true,
        };
      }
      return newState;
    }

    case typesTweet.TWEET_LIKE_STARTED: {
      
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

    case typesTweet.TWEET_LIKE_FAILED: {
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

    case typesTweet.TWEET_RETWEET_STARTED: {
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

    case typesTweet.TWEET_RETWEET_FAILED: {
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

    case typesTweet.TWEET_SAVE_TWEET_STARTED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = !is_saved;
      }
      return newState;
    }

    case typesTweet.TWEET_SAVE_TWEET_FAILED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = is_saved;
      }
      return newState;
    }


    case typesTweetSelected.TWEET_COMMENT_ADD_STARTED: {
      
      const newState = {...state};
      const comment  = action.payload;
      let id= 'tweet-' + comment.tweet;
      if(newState[id]){
          newState[id].data.comments +=1
      }
      return newState;
    }

    case typesTweetSelected.TWEET_COMMENT_ADD_FAILED: {
      const newState = {...state};
      const { comment } = action.payload;
      let id= 'tweet-' + comment.tweet;
      if(newState[id]){
          newState[id].data.comments -=1
      }
      return newState;
    }

    case typesTweetSelected.TWEET_COMMENT_REMOVE_STARTED: {
      
      const newState = {...state};
      const  comment  = action.payload;
      let id= 'tweet-' + comment.tweet.id;
      if(newState[id]){
          newState[id].data.comments -=1
      }
      return newState;
    }

    case typesTweetSelected.TWEET_COMMENT_REMOVE_FAILED: {
      const newState = {...state};
      const { comment}  = action.payload;
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

const searchTweetsOrder = (state = [], action) => {
  switch(action.type) {
    case types.SEARCH_TWEETS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.SEARCH_TWEETS_CLEAR: {
      const newState = []
      return newState;
    } 
    case typesTweet.TWEET_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload.id);
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
