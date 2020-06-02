/* -------------------------------------------------------------------------- */
/*                                Schema Tweets                               */
/* -------------------------------------------------------------------------- */

import { schema } from 'normalizr';


export const tweet = new schema.Entity(
  'tweets',
);
export const tweets = new schema.Array(tweet);