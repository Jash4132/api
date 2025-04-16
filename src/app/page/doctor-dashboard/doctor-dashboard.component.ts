import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { appointment } from '../../Interface/appointments';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(private http: HttpClient,private router: Router, private appointmentService:AppointmentService, private authService:AuthService) {}

  ngOnInit() {
    this.fetchAppointments();
    this.loadAppointments();
  }

  fetchAppointments() {
  this.http.get<any[]>('http://localhost:3000/appointments').subscribe(data => {
    this.appointments = data.map(app => ({ ...app, showRescheduleForm: false }));
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
  toggleRescheduleForm(app: any) {
    app.showRescheduleForm = true;
    app.newConsultationDate = app.consultationDate;
  }

  cancelReschedule(app: any) {
    app.showRescheduleForm = false;
  }

  rescheduleAppointment(app: any) {
    if (!app.newConsultationDate) return;

    const updated = {
      ...app,
      consultationDate: app.newConsultationDate
    };

    this.http.put(`http://localhost:3000/appointments/${app.id}`, updated)
      .subscribe(() => {
        app.consultationDate = app.newConsultationDate;
        app.showRescheduleForm = false;
        alert('Appointment rescheduled successfully.');
      });
  }
  isDoctorLoggedIn() {
    return sessionStorage.getItem('doctorLoggedIn') === 'true';
  }
  doctorLogout() {
    sessionStorage.removeItem('doctorLoggedIn');
    this.router.navigate(['/doctor-login']);
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data.map(app => ({ ...app, showRescheduleForm: false }));
    });
  }
  logout() {
    this.authService.getSession().subscribe((sessions) => {
      if (sessions.length > 0) {
        const sessionId = sessions[0].id;
        sessionStorage.clear();
        this.authService.logoutUser(sessionId).subscribe(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
