import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { alertReducer } from 'redux-saga-rn-alert';

import * as types from '../types/auth';
import auth, * as authSelectors from './auth';
import signUp, * as signUpSelectors from './signUp';
import tweets,* as tweetsSelector from './tweets';
import profile,* as profileSelector from './profile';
import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';

const reducer = combineReducers({
  auth,
  signUp,
  tweets,
  profile,
  form: formReducer,
  alertReducer,
});


const rootReducer = (state, action) => {
  if (action.type === AUTHENTICATION_IDENTITY_CLEARED) {
    state = undefined
  }

  return reducer(state, action)
}

export default rootReducer;




//Authorization Selectors
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthUserInformation = state => authSelectors.getAuthUserInformation(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

//Signup Selectors
export const getIsSigningUpUser = state => signUpSelectors.getIsSigningUpUser(state.signUp);
export const getSigningUpError = state => signUpSelectors.getSigningUpError(state.signUp);


//Tweets Selectors
export const getTweet = (state, id) => tweetsSelector.getTweet(state.tweets,id);
export const getTweets = state => tweetsSelector.getTweets(state.tweets);
export const isFetchingTweets = state => tweetsSelector.isFetchingTweets(state.tweets);
export const getFetchingTweetsError = state => tweetsSelector.getFetchingTweetsError(state.tweets);

//Profile Selectors
export const getProfileSelectedUserId = state => profileSelector.getProfileSelectedUserId(state.profile);
export const getProfileInfo = state => profileSelector.getProfileInfo(state.profile);
export const getProfileFollower = (state, id) => profileSelector.getProfileFollower(state.profile, id);
export const getProfileFollowers = state => profileSelector.getProfileFollowers(state.profile);
export const getProfileFollowing = (state, id) => profileSelector.getProfileFollowing(state.profile, id);
export const getProfileFollowings = state => profileSelector.getProfileFollowings(state.profile);
export const getProfileMyTweet = (state, id) => profileSelector.getProfileMyTweet(state.profile, id);
export const getProfileMyTweets = state => profileSelector.getProfileMyTweets(state.profile);
export const getProfileLikedTweet = (state, id) => profileSelector.getProfileLikedTweet(state.profile, id);
export const getProfileLikedTweets = state => profileSelector.getProfileLikedTweets(state.profile);
export const isProfileFetching = state => profileSelector.isProfileFetching(state.profile);
export const getProfileFetchingError = state => profileSelector.getProfileFetchingError(state.profile);
