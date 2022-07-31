import React, {useEffect} from 'react';
import {FC, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../../api/cafeApi';
import {LoginResponse, Usuario, RegisterResponse} from '../../interfaces/user';
import {AuthContext, authReducer} from './';
import {LoginData, RegisterData} from '../../interfaces/auth';

export interface AuthState {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'unauthenticated';
}

const AUTH_INITIAL_STATE: AuthState = {
  errorMessage: '',
  token: null,
  user: null,
  status: 'checking',
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return dispatch({type: '[Auth] - Not Authenticated'});
    }
    const {data, status} = await cafeApi.get('/auth');

    if (status !== 200) {
      return dispatch({type: '[Auth] - Not Authenticated'});
    }

    dispatch({
      type: '[Auth] - Sign Up',
      payload: {
        token: data.token,
        user: data.usuario,
      },
    });
    await AsyncStorage.setItem('token', data.token);
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: '[Auth] - Sign Up',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: '[Auth] - Add Error',
        payload: error.response.data.msg || 'Información inválida',
      });
    }
  };

  const signUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const {data} = await cafeApi.post<RegisterResponse>('/usuarios', {
        nombre,
        correo,
        password,
        role: 'USER_ROLE',
      });
      dispatch({
        type: '[Auth] - Sign Up',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: '[Auth] - Add Error',
        payload:
          error.response.data.errors[0].msg ||
          'Revise la información ingresada',
      });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: '[Auth] - Log Out'});
  };

  const removeError = () => {
    dispatch({
      type: '[Auth] - Remove Error',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
