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
import * as actions from '../actions/signUp';
import * as actionsAuth from '../actions/auth';
import * as types from '../types/signUp';
  
import {API_BASE_URL} from './index';
import { Alert } from 'react-native';
  
  
  function* signUp(action) {
    try {
      const response = yield call(
        fetch,
        `${API_BASE_URL}/users/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.status)
      if (response.status <= 300) {
        const { user } = yield response.json();
        yield put(actions.completeSignUp());
        yield put(actionsAuth.startLogin(action.payload));
      } else {
        
        let errorMessage="Error al crear usuario";
        const errorResponse = yield response.json();
        console.log(errorResponse);
        if(errorResponse.username!=undefined){
          if(errorResponse.username[0]=='A user with that username already exists.'){
            errorMessage="Un usuario con el nombre de usuario escogido ya existe."
          }
        }
        if(errorResponse.email!=undefined){
          if(errorResponse.email[0]=="Enter a valid email address."){
            errorMessage="Ingrese un correo eléctronico válido."
          }
        }
        yield put(actions.failSignUp('Inténtalo de nuevo.'));
        yield delay(200)
        const alertButtons =[
            {text: 'Aceptar', style:'default'},
        ]
        const titleError ="Inténtalo de nuevo"
        
    
        yield call(Alert.alert,titleError,errorMessage,alertButtons)
     
        
        
      }
    } catch (error) {
      console.log(error);
      yield put(actions.failSignUp('Falló en la conexión.'));
      yield delay(200)
      const alertButtons =[
            {text: 'Aceptar', style:'default'},
        ]
      const titleError ="Inténtalo de nuevo"
      const errorMessage="Falló la conexión con el servidor."
        
    
      yield call(Alert.alert,titleError,errorMessage,alertButtons)
    }
  }
  
 
  export function* watchSignUpStarted() {
    yield takeEvery(
      types.SIGNUP_USER_STARTED,
      signUp,
    );
  }
  