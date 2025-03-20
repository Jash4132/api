import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developer-message',
  templateUrl: './developer-message.component.html',
  styleUrls: ['./developer-message.component.css'],
  imports: [FormsModule, CommonModule],
})
export class DeveloperMessageComponent implements OnInit {
  messages: any[] = [];
  apiUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.messages = data;
    });
  }

  deleteMessage(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.messages = this.messages.filter((msg) => msg.id !== id);
      });
    }
  }
}
