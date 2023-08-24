import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class userAuthGuard implements CanActivate {
  constructor(private router: Router, private toastService: HotToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      this.toastService.error('Please login');
      return false;
    }
  }
}
