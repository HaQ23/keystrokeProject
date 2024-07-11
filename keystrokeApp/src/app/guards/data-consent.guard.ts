import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const dataConsentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUserData();

  if (user && !user.consent) {
    return true;
  } else if (user && user.consent) {
    router.navigate(['/keystroke-capture']);
    return false;
  } else {
    router.navigate(['/']);
    return false;
  }
};