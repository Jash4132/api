import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css'],
  imports:[CommonModule,FormsModule]
})
export class DoctorLoginComponent {
  doctor = { email: '', password: '' };
  errorMessage = '';

  constructor(private router: Router) {}

  doctorLogin() {
    const defaultEmail = 'doctor@test.com';
    const defaultPassword = 'doctor123';

    if (this.doctor.email === defaultEmail && this.doctor.password === defaultPassword) {
      sessionStorage.setItem('doctorLoggedIn', 'true');
      this.router.navigate(['/doctor-dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
