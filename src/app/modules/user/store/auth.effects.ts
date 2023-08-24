import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

//   login$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.login),
//         tap(() => {})
//       ),
//     { dispatch: false }
//   );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('userToken');
          this.router.navigate(['/user/login']);
        })
      ),
    { dispatch: false }
  );
}
