// user.selectors.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectUser = createFeatureSelector<AppState, any>('user');

export const getUser = createSelector(selectUser, (state) => state.user);
