import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toast: HotToastService = inject(HotToastService);

  let tokenCheck: boolean = false;
  function checkToken(): void {
    if (localStorage.getItem('adminToken')) tokenCheck = true;
  }
  checkToken();

  if (tokenCheck) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    toast.error('Please login');
    return false;
  }
};
