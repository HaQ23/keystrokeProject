import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const keystrokeCaptureGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUserData();

  if (user && user.consent) {
    return true;
  }
  router.navigate(['/data-consent']);
  return false;
};
