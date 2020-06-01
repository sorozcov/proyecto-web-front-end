import * as types from '../types/tweetSelected';

export const setSelectedTweetId = (id,tweet) => ({
  type: types.TWEET_ID_SELECTED,
  payload: { id,tweet }
});

//tweet info
export const startFetchingTweetInfo = () => ({
  type: types.TWEET_INFO_FETCH_STARTED,
});

export const completeFetchingTweetInfo = (tweet) => ({
  type: types.TWEET_INFO_FETCH_COMPLETED,
  payload: { tweet }
});

export const failFetchingTweetInfo = error => ({
  type: types.TWEET_INFO_FETCH_FAILED,
  payload: {
    error,
  },
});

//like users
export const startFetchingTweetLikeUsers = () => ({
  type: types.TWEET_LIKES_USERS_FETCH_STARTED,
});

export const completeFetchingTweetLikeUsers = (entities, order) => ({
  type: types.TWEET_LIKES_USERS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingTweetLikeUsers = error => ({
  type: types.TWEET_LIKES_USERS_FETCH_FAILED,
  payload: {
    error,
  },
});

//retweet users
export const startFetchingTweetRetweetUsers = () => ({
  type: types.TWEET_RETWEETS_USERS_FETCH_STARTED,
});

export const completeFetchingTweetRetweetUsers = (entities, order) => ({
  type: types.TWEET_RETWEETS_USERS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingTweetRetweetUsers = error => ({
  type: types.TWEET_RETWEETS_USERS_FETCH_FAILED,
  payload: {
    error,
  },
});


//comments
export const startFetchingTweetComments = () => ({
  type: types.TWEET_COMMENTS_FETCH_STARTED,
});

export const completeFetchingTweetComments = (entities, order) => ({
  type: types.TWEET_COMMENTS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingTweetComments = error => ({
  type: types.TWEET_COMMENTS_FETCH_FAILED,
  payload: {
    error,
  },
});




//ADD TWEET
export const startAddingComment= (comment) => ({
  type: types.TWEET_COMMENT_ADD_STARTED,
  payload: comment
});

export const completeAddingComment= ({oldId, comment}) => ({
  type: types.TWEET_COMMENT_ADD_COMPLETED,
  payload: {
    oldId,
    comment,
  },
});

export const failAddingComment= ({oldId,comment ,error}) => ({
  type: types.TWEET_COMMENT_ADD_FAILED,
  payload: {
    oldId,
    comment,
    error,
  },
});

//REMOVE COMMENT
export const startRemoveComment= (comment) => ({
  type: types.TWEET_COMMENT_REMOVE_STARTED,
  payload: comment
});

export const completeRemoveComment= ({oldId, comment}) => ({
  type: types.TWEET_COMMENT_REMOVE_COMPLETED,
  payload: {
    oldId,
    comment,
  },
});

export const failRemoveComment= ({oldId,comment ,error}) => ({
  type: types.TWEET_COMMENT_REMOVE_FAILED,
  payload: {
    oldId,
    comment,
    error,
  },
});