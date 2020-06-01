import { schema } from 'normalizr';

//Notifications Reweets
export const retweet = new schema.Entity(
  'retweets',
);
export const retweets = new schema.Array(retweet);

//Notifications Comments
export const comment = new schema.Entity(
  'comments',
);
export const comments = new schema.Array(comment);

//Notifications Reweets
export const like = new schema.Entity(
  'likes',
);
export const likes = new schema.Array(like);
