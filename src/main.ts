import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Component, importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './app/page/register/register.component';
import { LoginComponent } from './app/page/login/login.component';
import { DashboardComponent } from './app/page/dashboard/dashboard.component';
import { NavbarComponent } from './app/app/navbar/navbar.component';
import { BookAppointmentComponent } from './app/page/book-appointment/book-appointment.component';
import { DoctorLoginComponent } from './app/page/doctor-login/doctor-login.component';
import { DoctorDashboardComponent } from './app/page/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './app/page/patient-dashboard/patient-dashboard.component';
import { BlogComponent } from './app/page/blog/blog.component';
import { AboutUsComponent } from './app/page/about-us/about-us.component';
import { ContactUsComponent } from './app/page/contact-us/contact-us.component';
import { DeveloperMessageComponent } from './app/page/developer-message/developer-message.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {path:'dashboard', component:DashboardComponent},
      {path:'navbar', component:NavbarComponent},
      {path:'book-appointment', component:BookAppointmentComponent},
      {path:'doctor-login', component:DoctorLoginComponent},
      {path:'doctor-dashboard', component:DoctorDashboardComponent},
      {path:'patient-dashboard', component:PatientDashboardComponent},
      {path:'blog', component:BlogComponent},
      {path:'about-us', component:AboutUsComponent},
      {path:'contact-us',component:ContactUsComponent},
      {path:'developer-message', component:DeveloperMessageComponent},
      { path: '', redirectTo: 'register', pathMatch: 'full' }
    ]),
    importProvidersFrom(HttpClientModule, FormsModule)
  ]
}).catch(err => console.error(err));
