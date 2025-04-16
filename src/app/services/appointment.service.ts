import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appointment } from '../Interface/appointments';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments'; // Update as needed

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<appointment[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateAppointment(appointment: appointment): Observable<any> {
    return this.http.put(`${this.apiUrl}/${appointment.id}`, appointment);
  }
}
