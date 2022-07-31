import {Usuario} from '../../interfaces/user';
import {AuthState} from './';

type AuthActionType =
  | {type: '[Auth] - Sign Up'; payload: {token: string; user: Usuario}}
  | {type: '[Auth] - Add Error'; payload: string}
  | {type: '[Auth] - Remove Error'}
  | {type: '[Auth] - Not Authenticated'}
  | {type: '[Auth] - Log Out'};

export const authReducer = (
  state: AuthState,
  action: AuthActionType,
): AuthState => {
  switch (action.type) {
    case '[Auth] - Sign Up':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        errorMessage: '',
        status: 'authenticated',
      };
    case '[Auth] - Add Error':
      return {
        ...state,
        user: null,
        status: 'unauthenticated',
        token: null,
        errorMessage: action.payload,
      };
    case '[Auth] - Remove Error':
      return {
        ...state,
        errorMessage: '',
      };
    case '[Auth] - Not Authenticated':
      return {
        ...state,
        user: null,
        status: 'unauthenticated',
        token: null,
      };
    case '[Auth] - Log Out':
      return {
        ...state,
        user: null,
        status: 'unauthenticated',
        token: null,
      };
    default:
      return state;
  }
};
