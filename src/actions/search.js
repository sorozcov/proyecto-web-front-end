import * as types from '../types/search';


export const startFetchingSearchUsers = search => ({
  type: types.SEARCH_USERS_FETCH_STARTED,
  payload: { search },
});

export const completeFetchingSearchUsers = (entities, order) => ({
  type: types.SEARCH_USERS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingSearchUsers = error => ({
  type: types.SEARCH_USERS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const clearSearchUsers = () => ({
  type: types.SEARCH_USERS_CLEAR,
});

export const startFetchingSearchTweets = search => ({
  type: types.SEARCH_TWEETS_FETCH_STARTED,
  payload: { search },
});

export const completeFetchingSearchTweets = (entities, order) => ({
  type: types.SEARCH_TWEETS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingSearchTweets = error => ({
  type: types.SEARCH_TWEETS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const clearSearchTweets = () => ({
  type: types.SEARCH_TWEETS_CLEAR,
});
