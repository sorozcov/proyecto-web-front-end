import * as types from '../types/tweets';

//FETCH HOME TWEETS
export const startFetchingTweetsHome = () => ({
  type: types.TWEETS_HOME_FETCH_STARTED,
});

export const completeFetchingTweetsHome = (entities, order) => ({
  type: types.TWEETS_HOME_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingTweetsHome = error => ({
  type: types.TWEETS_HOME_FETCH_FAILED,
  payload: {
    error,
  },
});

//FETCH SAVED TWEETS
export const startFetchingSavedTweets = () => ({
  type: types.TWEETS_SAVED_FETCH_STARTED,
});

export const completeFetchingSavedTweets = (entities, order) => ({
  type: types.TWEETS_SAVED_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingSavedTweets = error => ({
  type: types.TWEETS_SAVED_FETCH_FAILED,
  payload: {
    error,
  },
});


//ADD TWEET
export const startAddingTweet = tweet => ({
  type: types.TWEET_ADD_STARTED,
  payload: tweet,
});

export const completeAddingTweet = (oldId, tweet) => ({
  type: types.TWEET_ADD_COMPLETED,
  payload: {
    oldId,
    tweet,
  },
});

export const failAddingTweet = (oldId, error) => ({
  type: types.TWEET_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

//REMOVE TWEET
export const startRemovingTweet = (idDB,id) => ({
  type: types.TWEET_REMOVE_STARTED,
  payload: {
    id,
    idDB
  },
});

export const completeRemovingTweet = ({idDB,id}) => ({
  type: types.TWEET_REMOVE_COMPLETED,
  payload: {
    id,
    idDB
  },
});

export const failRemovingTweet = ({id,idDB, error}) => ({
  type: types.TWEET_REMOVE_FAILED,
  payload: {
    id,
    error,
    idDB
  },
});

//RETWEETS
export const startRetweetingTweet = (idDB,id,is_retweeted) => ({
  type: types.TWEET_RETWEET_STARTED,
  payload: {
    id,
    idDB,
    is_retweeted
  },
});

export const completeRetweetingTweet = ({idDB,id,is_retweeted}) => ({
  type: types.TWEET_RETWEET_COMPLETED,
  payload: {
    id,
    idDB,
    is_retweeted
  },
});

export const failRetweetingTweet = ({idDB,id,is_retweeted, error}) => ({
  type: types.TWEET_RETWEET_FAILED,
  payload: {
    id,
    error,
    idDB,
    is_retweeted
  },
});


//LIKES
export const startLikingTweet = (idDB,id,is_liked) => ({
  type: types.TWEET_LIKE_STARTED,
  payload: {
    id,
    idDB,
    is_liked
  },
});

export const completeLikingTweet = ({idDB,id,is_liked}) => ({
  type: types.TWEET_LIKE_COMPLETED,
  payload: {
    id,
    idDB,
    is_liked
  },
});

export const failLikingTweet = ({id,idDB,is_liked, error}) => ({
  type: types.TWEET_LIKE_FAILED,
  payload: {
    id,
    error,
    idDB,
    is_liked
  },
});


//COMMENTS
export const startCommentingTweet = (idDB,id,comment,oldIdComment) => ({
  type: types.TWEET_COMMENT_STARTED,
  payload: {
    id,
    idDB,
    comment,
    oldIdComment
  },
});

export const completeCommentingTweet = (idDB,id,comment,oldIdComment) => ({
  type: types.TWEET_COMMENT_COMPLETED,
  payload: {
    id,
    idDB,
    comment,
    oldIdComment
  },
});

export const failCommentingTweet = (id,idDB, error,oldIdComment) => ({
  type: types.TWEET_COMMENT_FAILED,
  payload: {
    id,
    error,
    idDB,
    oldIdComment
  },
});


//SAVE TWEET
export const startSavingTweet = (idDB,id,is_saved) => ({
  type: types.TWEET_SAVE_TWEET_STARTED,
  payload: {
    id,
    idDB,
    is_saved
  },
});

export const completeSavingTweet = ({idDB,id,is_saved}) => ({
  type: types.TWEET_SAVE_TWEET_COMPLETED,
  payload: {
    id,
    idDB,
    is_saved
  },
});

export const failSavingTweet = ({id,idDB,is_saved, error}) => ({
  type: types.TWEET_SAVE_TWEET_FAILED,
  payload: {
    id,
    error,
    idDB,
    is_saved
  },
});


//FOLLOW TWEET USER
export const startFollowingTweetUser = (idDB,id,user_followed_by_me) => ({
  type: types.TWEET_FOLLOW_STARTED,
  payload: {
    id,
    idDB,
    user_followed_by_me
  },
});

export const completeFollowingTweetUser = (idDB,id,user_followed_by_me) => ({
  type: types.TWEET_FOLLOW_COMPLETED,
  payload: {
    id,
    idDB,
    user_followed_by_me
  },
});

export const failFollowingTweetUser = (id,idDB,user_followed_by_me, error) => ({
  type: types.TWEET_FOLLOW_FAILED,
  payload: {
    id,
    error,
    idDB,
    user_followed_by_me
  },
});