// user.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { addUser } from './user/user.actions';

const initialState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => ({ ...state, user }))
);
