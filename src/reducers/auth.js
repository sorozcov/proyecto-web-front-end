import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux';

import * as types from '../types/auth';


const token = (state = null, action) => {
  switch(action.type) {
    case types.AUTHENTICATION_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_COMPLETED: {
      return action.payload.token;
    }
    case types.AUTHENTICATION_FAILED: {
      return null;
    }
    case types.AUTHENTICATION_IDENTITY_CLEARED: {
      return null;
    }
  }

  return state;
};

const user = (state = null, action) => {
  switch(action.type) {
    case types.AUTHENTICATION_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_COMPLETED: {
      console.log(jwtDecode(action.payload.token))
      return jwtDecode(action.payload.token);
    }
    case types.AUTHENTICATION_FAILED: {
      return null;
    }
    case types.AUTHENTICATION_IDENTITY_CLEARED: {
      return null;
    }
  }

  return state;
};



const isAuthenticating = (state = false, action) => {
  switch(action.type) {
    case types.AUTHENTICATION_STARTED: {
      return true;
    }
    case types.AUTHENTICATION_COMPLETED: {
      return false;
    }
    case types.AUTHENTICATION_FAILED: {
      return false;
    }
  }

  return state;
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.AUTHENTICATION_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_COMPLETED: {
      return null;
    }
    case types.AUTHENTICATION_FAILED: {
      return action.payload.error;
    }
  }

  return state;
};

const userInformation = (state = null, action) => {
  switch(action.type) {
    case types.AUTHENTICATION_USER_INFORMATION_STARTED: {
      return null;
    }
    case types.AUTHENTICATION_USER_INFORMATION_COMPLETED: {
      
      return action.payload.user;
    }
  }
  return state;
};

const auth = combineReducers({
  token,
  user,
  userInformation,
  isAuthenticating,
  error,
});


export default auth;


export const getAuthToken = state => state.token;
export const getIsAuthenticating = state => state.isAuthenticating;
export const getAuthenticatingError = state => state.error;
export const getAuthUserID = state => state.user ? state.user.user_id : null;
export const getAuthExpiration = state => state.user ? state.user.exp : null;
export const getAuthUsername = state => state.user ? state.user.username : null;
export const getAuthUser = state => state.user ? state.user : null;
export const getAuthUserInformation = state => state.userInformation ? state.userInformation : null;
