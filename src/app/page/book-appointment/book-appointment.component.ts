import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  imports: [CommonModule, FormsModule]
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
  isSubmitting: boolean = false;

  constructor(private http: HttpClient) {}

  submitAppointment() {
    if (this.isFormInvalid()) {
      this.message = 'Please fill in all the required fields!';
      return;
    }

    const appointmentData = {
      ...this.appointment,
      problem: this.appointment.problem === 'Other' ? this.appointment.otherProblem : this.appointment.problem
    };

    // Set submitting state to true
    this.isSubmitting = true;

    this.http.post('http://localhost:3000/appointments', appointmentData).subscribe({
      next: (response) => {
        this.message = 'Appointment booked successfully!';
        this.resetForm();
      },
      error: (error) => {
        console.error('❌ Error saving appointment:', error);
        this.message = 'Failed to book appointment. Please try again.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  resetForm() {
    this.appointment = { name: '', email: '', phone: '', date: '', problem: '', otherProblem: '' };
  }

  isFormInvalid(): boolean {
    return !this.appointment.name || !this.appointment.email || !this.appointment.phone ||
           !this.appointment.date || !this.appointment.problem ||
           (this.appointment.problem === 'Other' && !this.appointment.otherProblem);
  }
}
