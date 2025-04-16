import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  imports:[FormsModule,CommonModule]
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const adminEmail = 'admin@drpro.com';
    const adminPassword = 'admin123';

    if (this.email === adminEmail && this.password === adminPassword) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
