import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private sessionsUrl = 'http://localhost:3000/sessions';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  loginUser(credentials: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`);
  }
  createSession(user: any): Observable<any> {
    return this.http.post(this.sessionsUrl, { userId: user.id, email: user.email });
  }

  getSession(): Observable<any> {
    return this.http.get<any>(this.sessionsUrl);
  }

  logoutUser(sessionId: number): Observable<any> {
    return this.http.delete(`${this.sessionsUrl}/${sessionId}`);
  }
}
