import * as types from '../types/tweets';


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

export const startRemovingTweet = id => ({
  type: types.TWEET_REMOVE_STARTED,
  payload: {
    id,
  },
});

export const completeRemovingTweet = (id) => ({
  type: types.TWEET_REMOVE_COMPLETED,
  payload: {
    id,
  },
});

export const failRemovingTweet = (id, error) => ({
  type: types.TWEET_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});
