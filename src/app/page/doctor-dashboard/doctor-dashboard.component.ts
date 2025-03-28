import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { appointment } from '../../Interface/appointments';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  imports:[CommonModule,FormsModule]
})
export class DoctorDashboardComponent implements OnInit {
  appointments: any[] = [];
  selectedAppointment: any = null;
  consultationDate: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.http.get<any[]>('http://localhost:3000/appointments').subscribe(data => {
      this.appointments = data;
    });
  }

  openAcceptDialog(appointment: appointment) {
    this.selectedAppointment = appointment;
  }

  closeDialog() {
    this.selectedAppointment = null;
    this.consultationDate = '';
  }

  acceptAppointment() {
    if (!this.consultationDate) return;

    const updatedAppointment = {
      ...this.selectedAppointment,
      consultationDate: this.consultationDate
    };

    this.http.put(`http://localhost:3000/appointments/${this.selectedAppointment.id}`, updatedAppointment)
      .subscribe(() => {
        this.fetchAppointments();
        this.closeDialog();
      });
  }
  isDoctorLoggedIn() {
    return sessionStorage.getItem('doctorLoggedIn') === 'true';
  }
  doctorLogout() {
    sessionStorage.removeItem('doctorLoggedIn');
    this.router.navigate(['/dashboard']);
  }
}
