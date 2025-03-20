import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  imports:[FormsModule,CommonModule]
})
export class PatientDashboardComponent {
  name: string = '';
  phone: string = '';
  appointments: any = null;

  apiUrl: string = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  fetchAppointments() {
    this.http.get<any[]>('http://localhost:3000/appointments')
      .subscribe(data => {
        this.appointments = data.filter(appointment =>
          appointment.name === this.name && appointment.phone === this.phone
        );
        if (this.appointments.length === 0) {
          alert("No appointments found for the provided details.");
          this.appointments = null;
        }
      });
  }
  cancelAppointment(id: number) {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.appointments = this.appointments.filter((app: any) => app.id !== id);
      alert('Appointment cancelled successfully.');
    });
  }
}
