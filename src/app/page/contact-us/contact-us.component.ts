import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  imports:[FormsModule]
})
export class ContactUsComponent {
  contact = { name: '', email: '', message: '' };
  apiUrl = 'http://localhost:3000/messages'; // JSON Server URL

  constructor(private http: HttpClient) {}

  submitForm() {
    console.log(this.contact);
    if (this.contact.name && this.contact.email && this.contact.message) {
      this.http.post(this.apiUrl, this.contact).subscribe(() => {
        alert('Your message has been sent successfully!');
        this.contact = { name: '', email: '', message: '' }; // Clear form after submission
      });
    } else {
      alert('Please fill out all fields.');
    }
  }
}
