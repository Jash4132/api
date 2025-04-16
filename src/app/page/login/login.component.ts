import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../Interface/appointments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  user = { email: '', password: '', role:'' };
  message = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();
    this.user.role= this.user.role.trim();

    if (!this.user.email || !this.user.password || !this.user.role) {
      this.errorMessage = 'Email, password and role are required!';
      return;
    }

    this.authService.loginUser(this.user).subscribe(
      (users) => {
        const user = users.find((u:User) => u.email === this.user.email && u.password === this.user.password);
        if (user) {
          const sessionData = {
            userId: user.id,
            email: user.email,
            role: this.user.role
          };

          // Create a session
          this.authService.createSession(sessionData).subscribe((session) => {
            if (session) {
              this.message = 'Login successful!';
              sessionStorage.setItem('loggedInUser', user.email);
              setTimeout(() => {
                if (this.user.role === 'doctor') {
                  this.router.navigate(['/doctor-login']);
                } else {
                  this.router.navigate(['/dashboard']);
                }
              }, 1000);
            }
          });
        } else {
          this.errorMessage = 'Invalid email or password!';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      },
      (error) => {
        this.errorMessage = 'Error connecting to server. Please try again.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    );
  }
}
