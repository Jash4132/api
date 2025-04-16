import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule],
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  appointments: any[] = [];
  sessions: any[] = [];
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchAppointments();
    this.fetchSessions();
    this.fetchMessages();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe((data) => {
      this.users = data;
    });
  }

  fetchAppointments() {
    this.http
      .get<any[]>('http://localhost:3000/appointments')
      .subscribe((data) => {
        this.appointments = data;
      });
  }

  fetchSessions() {
    this.http.get<any[]>('http://localhost:3000/sessions').subscribe((data) => {
      this.sessions = data;
    });
  }

  fetchMessages() {
    this.http.get<any[]>('http://localhost:3000/messages').subscribe((data) => {
      this.messages = data;
    });
  }
  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.http.delete(`http://localhost:3000/appointments/${id}`).subscribe(() => {
        this.appointments = this.appointments.filter(app => app.id !== id);
        alert('Appointment deleted successfully.');
      });
    }
  }
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
        alert('User deleted successfully.');
      });
    }
  }
}
