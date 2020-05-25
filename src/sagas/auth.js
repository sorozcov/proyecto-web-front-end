import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
  } from 'redux-saga/effects';

  import * as selectors from '../reducers';
  import * as actions from '../actions/auth';
  import * as types from '../types/auth';
  

import { Alert } from 'react-native';
import API_BASE_URL from './apibaseurl';
  
  function* login(action) {
    try {
      const response = yield call(
        fetch,
        `${API_BASE_URL}/token-auth/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );
      
      if (response.status <= 300) {
        const { token } = yield response.json();
        yield put(actions.completeLogin(token));
        yield put(actions.authenticationUserInformationStarted());
      } else {
        
        
       
        yield put(actions.failLogin('El nombre de usuario y contraseña introducidos no coinciden con nuestros registros. Revísalos e inténtalo de nuevo.'));
        yield delay(200)
        const alertButtons =[
            {text: 'Aceptar', style:'default'},
        ]
        const titleError ="Inténtalo de nuevo"
        const errorMessage='El nombre de usuario y contraseña introducidos no coinciden con nuestros registros. Revísalos e inténtalo de nuevo.';
    
        yield call(Alert.alert,titleError,errorMessage,alertButtons)
     
        
        
      }
    } catch (error) {
      
      yield put(actions.failLogin('Falló la autentitación.'));
      yield delay(200)
      const alertButtons =[
            {text: 'Aceptar', style:'default'},
        ]
      const titleError ="Inténtalo de nuevo"
      const errorMessage="Falló la conexión con el servidor."
        
    
      yield call(Alert.alert,titleError,errorMessage,alertButtons)
    }
  }
  

  
  export function* watchLoginStarted() {
    yield takeEvery(
      types.AUTHENTICATION_STARTED,
      login,
    );
  }
  



  function* userInformationRequest(action) {
    try {
      
     
      const isAuth = yield select(selectors.isAuthenticated);
      const userId = yield select(selectors.getAuthUserID);
     
      if (isAuth) {
       
        const token = yield select(selectors.getAuthToken);
        console.log(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/users/${userId}/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
      
      
      if (response.status <= 300) {
        const jsonResultUser = yield response.json();
        yield put(actions.authenticationUserInformationCompleted(jsonResultUser));
        
      } else {
        
        
       
        
        
        // const alertButtons =[
        //     {text: 'Aceptar', style:'default'},
        // ]
        // const titleError ="Inténtalo de nuevo"
        // const errorMessage='El nombre de usuario y contraseña introducidos no coinciden con nuestros registros. Revísalos e inténtalo de nuevo.';
    
        // yield call(Alert.alert,titleError,errorMessage,alertButtons)
     
        
        
        }
      }
    } catch (error) {
      
      console.log(error);
      // yield delay(200)
      // const alertButtons =[
      //       {text: 'Aceptar', style:'default'},
      //   ]
      // const titleError ="Inténtalo de nuevo"
      // const errorMessage="Falló la conexión con el servidor."
        
    
      // yield call(Alert.alert,titleError,errorMessage,alertButtons)
    }
  }


  export function* watchUserInformationRequest() {
    yield takeEvery(
      types.AUTHENTICATION_USER_INFORMATION_STARTED,
      userInformationRequest,
    );
  }