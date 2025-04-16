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
  user = { name: '', email: '', password: '', role:'' };
  message = '';
  errorMessage = '';
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    if(!this.emailRegex.test(this.user.email)){
      this.errorMessage= 'Invalid Email adress Format'
      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}?email=${this.user.email}`).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        this.errorMessage = 'Email already registered!';
        setTimeout(() => this.errorMessage = '', 3000);
        return;
      }

      this.http.post(this.apiUrl, this.user).subscribe(() => {
        this.message = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }, () => {
        this.errorMessage = 'Registration failed! Please try again.';
        setTimeout(() => this.errorMessage = '', 3000);
      });
    });
  }
}
