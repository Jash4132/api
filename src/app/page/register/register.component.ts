import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[CommonModule,FormsModule,RouterLink]
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  message = '';
  errorMessage = '';
  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
    this.user.name = this.user.name.trim();
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    if (!this.user.name || !this.user.email || !this.user.password) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    this.http.post(this.apiUrl, this.user).subscribe(() => {
      this.message = 'Registration successful! Redirecting to login...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }, () => {
      this.errorMessage = 'Registration failed! Please try again.';
    });
  }
}
