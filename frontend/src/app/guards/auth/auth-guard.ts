import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  console.log('AuthGuard checking...');
  console.log('isLoggedIn:', authService.isLoggedIn());
  console.log('Token:', authService.getToken());
  console.log('User:', authService.getUser());

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
