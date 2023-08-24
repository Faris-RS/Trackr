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
export class adminAuthGuard implements CanActivate {
  constructor(private router: Router, private toastService: HotToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('adminToken')) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      this.toastService.error('Please login');
      return false;
    }
  }
}
