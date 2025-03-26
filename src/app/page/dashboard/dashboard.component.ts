import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../app/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[NavbarComponent,RouterLink]
})
export class DashboardComponent implements OnInit {
  session: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getSession().subscribe((sessions) => {
      if (sessions.length > 0) {
        this.session = sessions[0]; // Assuming only one session at a time
      } else {
        this.router.navigate(['/login']); // Redirect to login if no active session
      }
    });
  }

  logout() {
    if (this.session) {
      this.authService.logoutUser(this.session.id).subscribe(() => {
        this.router.navigate(['/login']); // Redirect after logout
      });
    }
  }
}
