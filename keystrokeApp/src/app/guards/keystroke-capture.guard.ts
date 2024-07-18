import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const keystrokeCaptureGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUserData();

  if (user && user.hasConsented) {
    return true;
  } else if (user && !user.hasConsented) {
    router.navigate(['/data-consent']);
    return false;
  }
  router.navigate(['/login']);
  return false;
};
