import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports:[CommonModule]
})
export class BlogComponent {
  blogs = [
    {
      title: 'The Importance of Regular Health Checkups',
      date: 'March 20, 2025',
      content: 'Regular health checkups help detect potential health issues early, ensuring timely intervention and better outcomes. Learn why scheduling routine visits to your doctor is essential for your well-being.'
    },
    {
      title: '5 Tips for a Healthy Lifestyle',
      date: 'March 18, 2025',
      content: 'Adopting a healthy lifestyle is easier than you think! Here are 5 simple tips, including a balanced diet, regular exercise, and proper hydration, to keep you feeling your best.'
    },
    {
      title: 'Understanding Common Cold vs. Flu',
      date: 'March 15, 2025',
      content: 'Do you have a cold or the flu? Learn how to differentiate between the two, their symptoms, and the best treatments to recover quickly and stay healthy.'
    }
  ];
}
