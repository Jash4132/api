import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    const isLoggedIn = !!sessionStorage.getItem('loggedInUser');

    if (!isLoggedIn) {
      alert('Access denied! Please log in.');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  };
}
