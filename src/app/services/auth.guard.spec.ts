import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    const isLoggedIn = !!sessionStorage.getItem('loggedInUser'); // Check if user is logged in

    if (!isLoggedIn) {
      alert('Access denied! Please log in.');
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
    return true;
  };
}
