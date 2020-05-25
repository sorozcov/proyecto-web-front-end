import * as types from '../types/signUp';


export const startSignUp = ({username, password,email,first_name,last_name}) => ({
  type: types.SIGNUP_USER_STARTED,
  payload: { username, password,email,first_name,last_name },
});

export const completeSignUp = () => ({
  type: types.SIGNUP_USER_COMPLETED,
  payload: {},
});

export const failSignUp = error => ({
  type: types.SIGNUP_USER_FAILED,
  payload: { error },
});

