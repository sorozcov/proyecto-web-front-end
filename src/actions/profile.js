/* -------------------------------------------------------------------------- */
/*                        Acciones del reductor Profile                       */
/* -------------------------------------------------------------------------- */

import * as types from '../types/profile';

export const setSelectedProfileUserId = (id) => ({
  type: types.PROFILE_USER_ID_SELECTED,
  payload: { id }
});

export const startFetchingProfileInfo = () => ({
  type: types.PROFILE_INFO_FETCH_STARTED,
});

export const completeFetchingProfileInfo = (profile) => ({
  type: types.PROFILE_INFO_FETCH_COMPLETED,
  payload: { profile }
});

export const failFetchingProfileInfo = error => ({
  type: types.PROFILE_INFO_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingProfileFollowers = () => ({
  type: types.PROFILE_FOLLOWERS_FETCH_STARTED,
});

export const completeFetchingProfileFollowers = (entities, order) => ({
  type: types.PROFILE_FOLLOWERS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingProfileFollowers = error => ({
  type: types.PROFILE_FOLLOWERS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingProfileFollowing = () => ({
  type: types.PROFILE_FOLLOWING_FETCH_STARTED,
});

export const completeFetchingProfileFollowing = (entities, order) => ({
  type: types.PROFILE_FOLLOWING_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingProfileFollowing = error => ({
  type: types.PROFILE_FOLLOWING_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingProfileMyTweets = () => ({
  type: types.PROFILE_MY_TWEETS_FETCH_STARTED,
});

export const completeFetchingProfileMyTweets = (entities, order) => ({
  type: types.PROFILE_MY_TWEETS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingProfileMyTweets = error => ({
  type: types.PROFILE_MY_TWEETS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingProfileLikedTweets = () => ({
  type: types.PROFILE_LIKED_TWEETS_FETCH_STARTED,
});

export const completeFetchingProfileLikedTweets = (entities, order) => ({
  type: types.PROFILE_LIKED_TWEETS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingProfileLikedTweets = error => ({
  type: types.PROFILE_LIKED_TWEETS_FETCH_FAILED,
  payload: {
    error,
  },
});


//Follow
export const startFollowProfile = (id, im_following) => ({
  type: types.PROFILE_FOLLOW_STARTED,
  payload: {
    id,
    im_following
  },
});

export const completeFollowProfile = im_following => ({
  type: types.PROFILE_FOLLOW_COMPLETED,
  payload: {
    im_following
  },
});

export const failFollowProfile = error => ({
  type: types.PROFILE_FOLLOW_FAILED,
  payload: {
    error
  },
});