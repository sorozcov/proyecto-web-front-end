import { schema } from 'normalizr';

//Profile Followers
export const follower = new schema.Entity(
  'followers',
);
export const followers = new schema.Array(follower);

//Profile Following
export const following = new schema.Entity(
  'followings',
);
export const followings = new schema.Array(following);

//Profile my tweets
export const myTweet = new schema.Entity(
  'myTweets',
);
export const myTweets = new schema.Array(myTweet);

//Profile liked tweets
export const likedTweet = new schema.Entity(
  'likedTweets',
);
export const likedTweets = new schema.Array(likedTweet);
