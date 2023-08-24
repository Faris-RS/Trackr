import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth.reducer';
import { logout } from '../../store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.isAuthenticated$ = this.store.pipe(
      select((state) => state.auth.isAuthenticated)
    );
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  navigateToLogin(): void {
    this.router.navigate(['/user/login']);
  }
}
