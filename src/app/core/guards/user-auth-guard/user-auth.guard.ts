import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toast: HotToastService = inject(HotToastService);

  let tokenCheck: boolean = false;
  function checkToken(): void {
    if (localStorage.getItem('userToken')) tokenCheck = true;
  }
  checkToken();

  if (tokenCheck) {
    return true;
  } else {
    router.navigate(['/user/login']);
    toast.error('Please login');
    return false;
  }
};
