import {createContext} from 'react';
import {Usuario} from '../../interfaces/user';
import {LoginData, RegisterData} from '../../interfaces/auth';

interface ContextProps {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'unauthenticated';
  signUp: ({nombre, correo, password}: RegisterData) => void;
  signIn: ({correo, password}: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
}

export const AuthContext = createContext({} as ContextProps);
