/* -------------------------------------------------------------------------- */
/*                                Schema Search                               */
/* -------------------------------------------------------------------------- */

import { schema } from 'normalizr';

//Search Users
export const user = new schema.Entity(
  'users',
);
export const users = new schema.Array(user);

//Search Tweets
export const tweet = new schema.Entity(
  'tweets',
);
export const tweets = new schema.Array(tweet);
