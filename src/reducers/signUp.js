
import { combineReducers } from 'redux';

import * as types from '../types/signUp';




const isSigningUpUser = (state = false, action) => {
  switch(action.type) {
    case types.SIGNUP_USER_STARTED: {
      return true;
    }
    case types.SIGNUP_USER_COMPLETED: {
      return false;
    }
    case types.SIGNUP_USER_FAILED: {
      return false;
    }
  }

  return state;
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.SIGNUP_USER_STARTED: {
      return null;
    }
    case types.SIGNUP_USER_COMPLETED: {
      return null;
    }
    case types.SIGNUP_USER_FAILED: {
      return action.payload.error;
    }
  }

  return state;
};

const signUp = combineReducers({
  isSigningUpUser,
  error,
});


export default signUp;



export const getIsSigningUpUser = state => state.isSigningUpUser;
export const getSigningUpError = state => state.error;
