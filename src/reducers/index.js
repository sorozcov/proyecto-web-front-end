import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { alertReducer } from 'redux-saga-rn-alert';

import * as types from '../types/auth';
import auth, * as authSelectors from './auth';
import signUp, * as signUpSelectors from './signUp';
import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';

const reducer = combineReducers({
  auth,
  signUp,
  form: formReducer,
  alertReducer,
});


const rootReducer = (state, action) => {
  if (action.type === AUTHENTICATION_IDENTITY_CLEARED) {
    state = undefined
  }

  return reducer(state, action)
}

export default rootReducer;




//Authorization Selectors
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);

//Signup Selectors
export const getIsSigningUpUser = state => signUpSelectors.getIsSigningUpUser(state.signUp);
export const getSigningUpError = state => signUpSelectors.getSigningUpError(state.signUp);