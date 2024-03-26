import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authServices = inject(AuthService);
  const router = inject(Router);

  if (authServices.isAdmin$.value) {
    return true;
  }

  router.navigate(['auth', 'login']);
  return false;
};
