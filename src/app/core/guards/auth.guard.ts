import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  //const isAutenticated = !!localStorage.getItem('token');
  const router = inject(Router);
  const authService = inject(AuthService);
  //return isAutenticated ? true : router.createUrlTree(['auth', 'login']);

  return authService
  .verifyToken()
  .pipe(
    map( (isAuthenticated) =>
      isAuthenticated ? true : router.createUrlTree(['auth', 'login'])
    )
  );
};
