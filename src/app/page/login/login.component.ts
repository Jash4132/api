import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  user = { email: '', password: '' };
  message = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    this.authService.loginUser(this.user).subscribe(
      (users) => {
        if (users.length > 0) {
          const user = users[0];

          // Create a session
          this.authService.createSession(user).subscribe((session) => {
            if (session) {
              this.message = 'Login successful!';
              sessionStorage.setItem('loggedInUser', user.email); // Store user email in session
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 1000);
            }
          });
        } else {
          this.errorMessage = 'Invalid email or password!';
        }
      },
      (error) => {
        this.errorMessage = 'Error connecting to server. Please try again.';
      }
    );
  }
}
