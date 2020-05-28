import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import * as types from '../types/profile';


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
