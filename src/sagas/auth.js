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
  
import {API_BASE_URL} from './index';
import { Alert } from 'react-native';
  
  
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
      console.log(response.status);
      if (response.status === 200) {
        const { token } = yield response.json();
        yield put(actions.completeLogin(token));
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
  