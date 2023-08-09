// user.actions.ts

import { createAction, props } from '@ngrx/store';

export const addUser = createAction(
  '[User] Add User',
  props<{ user: any }>()
);
