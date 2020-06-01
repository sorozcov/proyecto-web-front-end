import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { alertReducer } from 'redux-saga-rn-alert';

import * as types from '../types/auth';
import auth, * as authSelectors from './auth';
import signUp, * as signUpSelectors from './signUp';
import tweets, * as tweetsSelector from './tweets';
import profile, * as profileSelector from './profile';
import search, * as searchSelector from './search';
import chat, * as chatSelector from './chat';
import notifications, * as notificationsSelector from './notifications';
import tweetSelected, * as tweetSelectedSelectors from './tweetSelected';
import savedTweets, * as savedTweetsSelector from './savedTweets';
import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';

const reducer = combineReducers({
  auth,
  signUp,
  tweets,
  profile,
  search,
  chat,
  savedTweets,
  notifications,
  tweetSelected,
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


//Tweets Selectors
export const getSavedTweet = (state, id) => savedTweetsSelector.getTweet(state.savedTweets,id);
export const getSavedTweets = state => savedTweetsSelector.getTweets(state.savedTweets).filter(tweet => tweet.data.is_saved==true);
export const isFetchingSavedTweets = state => savedTweetsSelector.isFetchingTweets(state.savedTweets);
export const getFetchingSavedTweetsError = state => savedTweetsSelector.getFetchingTweetsError(state.savedTweets);

//Profile Selectors
export const getProfileSelectedUserId = state => profileSelector.getProfileSelectedUserId(state.profile);
export const getProfileInfo = state => profileSelector.getProfileInfo(state.profile);
export const getProfileInfoIsMe = state => profileSelector.getProfileInfoIsMe(state.profile);
export const getProfileInfoImFollowing = state => profileSelector.getProfileInfoImFollowing(state.profile);
export const getProfileInfoTheyFollow = state => profileSelector.getProfileInfoTheyFollow(state.profile);
export const getProfileFollower = (state, id) => profileSelector.getProfileFollower(state.profile, id);
export const getProfileFollowers = state => profileSelector.getProfileFollowers(state.profile);
export const getProfileFollowing = (state, id) => profileSelector.getProfileFollowing(state.profile, id);
export const getProfileFollowings = state => profileSelector.getProfileFollowings(state.profile);
export const getProfileMyTweet = (state, id) => profileSelector.getProfileMyTweet(state.profile, id);
export const getProfileMyTweets = state => profileSelector.getProfileMyTweets(state.profile).filter(tweet=>(tweet.itemType='tweet'|| (tweet.itemType='retweet' && tweet.data.is_retweeted)));
export const getProfileLikedTweet = (state, id) => profileSelector.getProfileLikedTweet(state.profile, id);
export const getProfileLikedTweets = state => profileSelector.getProfileLikedTweets(state.profile).filter(tweet=>tweet.data.is_liked==true);
export const isProfileFetching = state => profileSelector.isProfileFetching(state.profile);
export const getProfileFetchingError = state => profileSelector.getProfileFetchingError(state.profile);
export const isProfileFetchingTweets = state => profileSelector.isProfileFetchingTweets(state.profile);
export const isProfileFetchingTweetsLike = state => profileSelector.isProfileFetchingTweetsLike(state.profile);

//Search Selectors
export const getSearchUser = (state, id) => searchSelector.getSearchUser(state.search, id);
export const getSearchUsers = state => searchSelector.getSearchUsers(state.search);
export const getSearchTweet = (state, id) => searchSelector.getSearchTweet(state.search, id);
export const getSearchTweets = state => searchSelector.getSearchTweets(state.search);
export const isSearchUsersFetching = state => searchSelector.isSearchUsersFetching(state.search);
export const isSearchTweetsFetching = state => searchSelector.isSearchTweetsFetching(state.search);
export const getSearchFetchingError = state => searchSelector.getSearchFetchingError(state.search);

//Chat selectors
export const getSelectedUserMessage = (state) => chatSelector.getSelectedUserMessage(state.chat);
export const getUserMessage = (state, id) => chatSelector.getUserMessage(state.chat, id);
export const getUserMessages = state => chatSelector.getUserMessages(state.chat);
export const getChatMessage = (state, id) => chatSelector.getChatMessage(state.chat, id);
export const getChatMessages = state => chatSelector.getChatMessages(state.chat);
export const isUserMessagesFetching = state => chatSelector.isUserMessagesFetching(state.chat);
export const isChatMessagesFetching = state => chatSelector.isChatMessagesFetching(state.chat);
export const isUserMessagesAdding = state => chatSelector.isUserMessagesAdding(state.chat);
export const isChatMessagesAdding = state => chatSelector.isChatMessagesAdding(state.chat);
export const getChatFetchingError = state => chatSelector.getChatFetchingError(state.chat);
export const getUserMessageInfoBySelectedUser = (state, id) => chatSelector.getUserMessageInfoBySelectedUser(state.chat,id);

//Notifications selectors
export const getNotificationsRetweet = (state, id) => notificationsSelector.getNotificationsRetweet(state.notifications, id);
export const getNotificationsRetweets = state => notificationsSelector.getNotificationsRetweets(state.notifications);
export const getNotificationsComment = (state, id) => notificationsSelector.getNotificationsComment(state.notifications, id);
export const getNotificationsComments = state => notificationsSelector.getNotificationsComments(state.notifications);
export const getNotificationsLike = (state, id) => notificationsSelector.getNotificationsLike(state.notifications, id);
export const getNotificationsLikes = state => notificationsSelector.getNotificationsLikes(state.notifications);
export const isNotificationsRetweetsFetching = state => notificationsSelector.isNotificationsRetweetsFetching(state.notifications);
export const isNotificationsCommentsFetching = state => notificationsSelector.isNotificationsCommentsFetching(state.notifications);
export const isNotificationsLikesFetching = state => notificationsSelector.isNotificationsLikesFetching(state.notifications);
export const getNotificationsFetchingError = state => notificationsSelector.getNotificationsFetchingError(state.notifications);

//Tweet Selected Selectors
export const getTweetSelectedId = state => tweetSelectedSelectors.getTweetSelectedId(state.tweetSelected)
export const getTweetInfo = state => tweetSelectedSelectors.getTweetInfo(state.tweetSelected)
export const getLikeUser = (state, id) => tweetSelectedSelectors.getLikeUser(state.tweetSelected,id)
export const getLikeUsers = state => tweetSelectedSelectors.getLikeUsers(state.tweetSelected)
export const geRetweetUser = (state, id) => tweetSelectedSelectors.geRetweetUser(state.tweetSelected,id)
export const getRetweetUsers = state => tweetSelectedSelectors.getRetweetUsers(state.tweetSelected)
export const getTweetComment =(state, id) => tweetSelectedSelectors.getTweetComment(state.tweetSelected,id)
export const getTweetComments = state => tweetSelectedSelectors.getTweetComments(state.tweetSelected)
export const isTweetFetchingInfo = state => tweetSelectedSelectors.isTweetFetchingInfo(state.tweetSelected)
export const isTweetFetchingLikeUsers = state => tweetSelectedSelectors.isTweetFetchingLikeUsers(state.tweetSelected)
export const isTweetFetchingRetwetUsers = state => tweetSelectedSelectors.isTweetFetchingRetwetUsers(state.tweetSelected)
export const isTweetFetchingComments = state => tweetSelectedSelectors.isTweetFetchingComments(state.tweetSelected)
export const getErrorTweetSelected = state => tweetSelectedSelectors.getErrorTweetSelected(state.tweetSelected)
