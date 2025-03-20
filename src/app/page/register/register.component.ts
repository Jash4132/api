import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[CommonModule,FormsModule,RouterLink]
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  message = '';

  constructor(private authService: AuthService,private router: Router) {}

  registerUser() {
    this.authService.registerUser(this.user).subscribe(() => {
      this.message = 'Registration successful!';
      this.user = { name: '', email: '', password: '' };
      this.router.navigate(['/login']);
    });
  }
}
