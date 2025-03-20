import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports:[RouterLink,CommonModule]
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.getSession().subscribe((sessions) => {
      if (sessions.length > 0) {
        const sessionId = sessions[0].id;
        this.authService.logoutUser(sessionId).subscribe(() => {
          this.router.navigate(['/login']); // Redirect after logout
        });
      }
    });
  }
  isDoctorLoggedIn() {
    return sessionStorage.getItem('doctorLoggedIn') === 'true';
  }

  // doctorLogout() {
  //   sessionStorage.removeItem('doctorLoggedIn');
  //   this.router.navigate(['/doctor-login']);
  // }
}
