import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  imports:[CommonModule,FormsModule]
})
export class BookAppointmentComponent {
  appointment = {
    name: '',
    email: '',
    phone: '',
    date: '',
    problem: '',
    otherProblem: ''
  };

  message: string = '';

  constructor(private http: HttpClient) {}

  submitAppointment() {
    const appointmentData = {
      ...this.appointment,
      problem: this.appointment.problem === 'Other' ? this.appointment.otherProblem : this.appointment.problem
    };

    this.http.post('http://localhost:3000/appointments', appointmentData).subscribe({
      next: (response) => {
        this.message = 'Appointment booked successfully!';
        this.resetForm();
      },
      error: (error) => {
        console.error('❌ Error saving appointment:', error);
      }
    });
  }

  resetForm() {
    this.appointment = { name: '', email: '', phone: '', date: '', problem: '', otherProblem: '' };
  }
}
