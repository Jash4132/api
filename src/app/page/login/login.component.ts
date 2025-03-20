import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule,CommonModule,RouterLink]
})
export class LoginComponent {
  user = { email: '', password: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.loginUser(this.user).subscribe((users) => {
      if (users.length > 0) {
        const user = users[0];

        // Create a session and then navigate
        this.authService.createSession(user).subscribe((session) => {
          if (session) {
            this.message = 'Login successful!';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        });
      } else {
        this.message = 'Invalid credentials. Try again!';
      }
    });
  }
}
