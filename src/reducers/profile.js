import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/profile';
import * as tweetTypes from '../types/tweets'

//Profile selected user id
const profileSelectedUserId = (state = null, action) => {
  switch(action.type) {
    case types.PROFILE_USER_ID_SELECTED: {
      return action.payload.id;
    }
  }
  return state;
};

//Profile Information
const profileInfo = (state = null, action) => {
  switch(action.type) {
    case types.PROFILE_INFO_FETCH_STARTED: {
      return null;
    }
    case types.PROFILE_FOLLOW_COMPLETED: {
      const newState = {...state};
      const { im_following } = action.payload;
      if(newState){
        if(im_following){
          newState.followers -=1
        }else{
          newState.followers +=1
        }
        newState.im_following = !im_following;
      }
      return newState;
    }
    case types.PROFILE_INFO_FETCH_COMPLETED: {
      
      return action.payload.profile;
    }
  }
  return state;
};

//Profile Followers
const profileFollowersById = (state = {}, action) => {
  switch(action.type) {
    case types.PROFILE_FOLLOWERS_FETCH_COMPLETED: {
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

const profileFollowersOrder = (state = [], action) => {
  switch(action.type) {
    case types.PROFILE_FOLLOWERS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    default: {
      return state;
    }
  }
};


//Profile Following
const profileFollowingById = (state = {}, action) => {
  switch(action.type) {
    case types.PROFILE_FOLLOWING_FETCH_COMPLETED: {
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

const profileFollowingOrder = (state = [], action) => {
  switch(action.type) {
    case types.PROFILE_FOLLOWING_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    default: {
      return state;
    }
  }
};

//Profile my tweets
const profileMyTweetsById = (state = {}, action) => {
  switch(action.type) {
    case types.PROFILE_MY_TWEETS_FETCH_COMPLETED: {
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


    case tweetTypes.TWEET_REMOVE_COMPLETED: {
      if(state[action.payload.id]){
        return omit(state, action.payload.id);
      }
      return state;
    }
    

    case tweetTypes.TWEET_REMOVE_STARTED: {
      const newState = { ...state };
      if(newState[action.payload.id]){
        newState[action.payload.id] = {
          ...newState[action.payload.id],
          isConfirmed: false,
        };
     }
      return newState;
    }
    
    case tweetTypes.TWEET_REMOVE_FAILED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id] = {
          ...newState[id],
          isConfirmed: true,
        };
      }
      return newState;
    }

    case tweetTypes.TWEET_LIKE_STARTED: {
      
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

    case tweetTypes.TWEET_LIKE_FAILED: {
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

    case tweetTypes.TWEET_RETWEET_STARTED: {
      
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

    case tweetTypes.TWEET_RETWEET_FAILED: {
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

    case tweetTypes.TWEET_SAVE_TWEET_STARTED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = !is_saved;
      }
      return newState;
    }

    case tweetTypes.TWEET_SAVE_TWEET_FAILED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = is_saved;
      }
      return newState;
    }

    case tweetTypes.TWEET_COMMENT_STARTED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id].data.comments +=1;
      }
      return newState;
    }

    case tweetTypes.TWEET_COMMENT_FAILED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id].data.comments +=1;
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

const profileMyTweetsOrder = (state = [], action) => {
  switch(action.type) {
    case types.PROFILE_MY_TWEETS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case tweetTypes.TWEET_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

//Profile liked tweets
const profileLikedTweetsById = (state = {}, action) => {
  switch(action.type) {
    case types.PROFILE_LIKED_TWEETS_FETCH_COMPLETED: {
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

    case tweetTypes.TWEET_REMOVE_COMPLETED: {
      if(state[action.payload.id]){
        return omit(state, action.payload.id);
      }
      return state;
    }
    

    case tweetTypes.TWEET_REMOVE_STARTED: {
      const newState = { ...state };
      if(newState[action.payload.id]){
        newState[action.payload.id] = {
          ...newState[action.payload.id],
          isConfirmed: false,
        };
     }
      return newState;
    }
    
    case tweetTypes.TWEET_REMOVE_FAILED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id] = {
          ...newState[id],
          isConfirmed: true,
        };
      }
      return newState;
    }

    case tweetTypes.TWEET_LIKE_STARTED: {
      
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

    case tweetTypes.TWEET_LIKE_FAILED: {
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

    case tweetTypes.TWEET_RETWEET_STARTED: {
      
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

    case tweetTypes.TWEET_RETWEET_FAILED: {
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

    case tweetTypes.TWEET_SAVE_TWEET_STARTED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = !is_saved;
      }
      return newState;
    }

    case tweetTypes.TWEET_SAVE_TWEET_FAILED: {
      const newState = {...state};
      const { id,is_saved } = action.payload;
      if(newState[id]){
        newState[id].data.is_saved = is_saved;
      }
      return newState;
    }

    case tweetTypes.TWEET_COMMENT_STARTED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id].data.comments +=1;
      }
      return newState;
    }

    case tweetTypes.TWEET_COMMENT_FAILED: {
      const newState = {...state};
      const { id } = action.payload;
      if(newState[id]){
        newState[id].data.comments +=1;
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

const profileLikedTweetsOrder = (state = [], action) => {
  switch(action.type) {
    case types.PROFILE_LIKED_TWEETS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case tweetTypes.TWEET_REMOVE_COMPLETED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetchingProfileLikeTweets = (state = false, action)=>{
  switch(action.type) {


    
    //Profile liked tweets
    case types.PROFILE_LIKED_TWEETS_FETCH_STARTED: {
      return true;
    }
    case types.PROFILE_LIKED_TWEETS_FETCH_COMPLETED: {
      return false;
    }
    case types.PROFILE_LIKED_TWEETS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
}

const isFetchingProfileTweets = (state = false, action)=>{
  switch(action.type) {


    //Profile my tweets
    case types.PROFILE_MY_TWEETS_FETCH_STARTED: {
      return true;
    }
    case types.PROFILE_MY_TWEETS_FETCH_COMPLETED: {
      return false;
    }
    case types.PROFILE_MY_TWEETS_FETCH_FAILED: {
      return false;
    }

    default: {
      return state;
    }
  }
}

const isFetching = (state = false, action) => {
  switch(action.type) {
    //Profile Information
    case types.PROFILE_INFO_FETCH_STARTED: {
      return true;
    }
    case types.PROFILE_INFO_FETCH_COMPLETED: {
      return false;
    }
    case types.PROFILE_INFO_FETCH_FAILED: {
      return false;
    }
    //Profile Followers
    case types.PROFILE_FOLLOWERS_FETCH_STARTED: {
      return true;
    }
    case types.PROFILE_FOLLOWERS_FETCH_COMPLETED: {
      return false;
    }
    case types.PROFILE_FOLLOWERS_FETCH_FAILED: {
      return false;
    }
    //Profile Following
    case types.PROFILE_FOLLOWING_FETCH_STARTED: {
      return true;
    }
    case types.PROFILE_FOLLOWING_FETCH_COMPLETED: {
      return false;
    }
    case types.PROFILE_FOLLOWING_FETCH_FAILED: {
      return false;
    }
    //Profile my tweets
    case types.PROFILE_MY_TWEETS_FETCH_STARTED: {
      return true;
    }
    case types.PROFILE_MY_TWEETS_FETCH_COMPLETED: {
      return false;
    }
    case types.PROFILE_MY_TWEETS_FETCH_FAILED: {
      return false;
    }
    //Profile liked tweets
    case types.PROFILE_LIKED_TWEETS_FETCH_STARTED: {
      return true;
    }
    case types.PROFILE_LIKED_TWEETS_FETCH_COMPLETED: {
      return false;
    }
    case types.PROFILE_LIKED_TWEETS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    //Profile Information
    case types.PROFILE_INFO_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PROFILE_INFO_FETCH_STARTED: {
      return null;
    }
    case types.PROFILE_INFO_FETCH_COMPLETED: {
      return null;
    }
    //Profile Followers
    case types.PROFILE_FOLLOWERS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PROFILE_FOLLOWERS_FETCH_STARTED: {
      return null;
    }
    case types.PROFILE_FOLLOWERS_FETCH_COMPLETED: {
      return null;
    }
    //Profile Following
    case types.PROFILE_FOLLOWING_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PROFILE_FOLLOWING_FETCH_STARTED: {
      return null;
    }
    case types.PROFILE_FOLLOWING_FETCH_COMPLETED: {
      return null;
    }
    //Profile my tweets
    case types.PROFILE_MY_TWEETS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PROFILE_MY_TWEETS_FETCH_STARTED: {
      return null;
    }
    case types.PROFILE_MY_TWEETS_FETCH_COMPLETED: {
      return null;
    }
    //Profile liked tweets
    case types.PROFILE_LIKED_TWEETS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PROFILE_LIKED_TWEETS_FETCH_STARTED: {
      return null;
    }
    case types.PROFILE_LIKED_TWEETS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  profileSelectedUserId,
  profileInfo,
  profileFollowersById,
  profileFollowersOrder,
  profileFollowingById,
  profileFollowingOrder,
  profileMyTweetsById,
  profileMyTweetsOrder,
  profileLikedTweetsById,
  profileLikedTweetsOrder,
  isFetching,
  isFetchingProfileLikeTweets,
  isFetchingProfileTweets,
  error,
});


export const getProfileSelectedUserId = state => state.profileSelectedUserId ? state.profileSelectedUserId : null;
export const getProfileInfo = state => state.profileInfo ? state.profileInfo : null;
export const getProfileInfoIsMe = state => state.profileInfo ? state.profileInfo.is_me : null;
export const getProfileInfoImFollowing = state => state.profileInfo ? state.profileInfo.im_following : null;
export const getProfileInfoTheyFollow = state => state.profileInfo ? state.profileInfo.they_follow : null;
export const getProfileFollower = (state, id) => state.profileFollowersById[id];
export const getProfileFollowers = state => state.profileFollowersOrder.map(id => getProfileFollower(state, id));
export const getProfileFollowing = (state, id) => state.profileFollowingById[id];
export const getProfileFollowings = state => state.profileFollowingOrder.map(id => getProfileFollowing(state, id));
export const getProfileMyTweet = (state, id) => state.profileMyTweetsById[id];
export const getProfileMyTweets = state => state.profileMyTweetsOrder.map(id => getProfileMyTweet(state, id));
export const getProfileLikedTweet = (state, id) => state.profileLikedTweetsById[id];
export const getProfileLikedTweets = state => state.profileLikedTweetsOrder.map(id => getProfileLikedTweet(state, id));
export const isProfileFetching = state => state.isFetching;
export const isProfileFetchingTweets = state => state.isFetchingProfileTweets;
export const isProfileFetchingTweetsLike = state => state.isFetchingProfileLikeTweets;
export const getProfileFetchingError = state => state.error;
