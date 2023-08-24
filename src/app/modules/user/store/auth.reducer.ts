import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  isAuthenticated: !!localStorage.getItem('userToken'),
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({ ...state, isAuthenticated: true })),
  on(AuthActions.logout, (state) => ({ ...state, isAuthenticated: false }))
);
