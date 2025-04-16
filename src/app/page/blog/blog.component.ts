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
      date: 'March 15, 2025',
      content: 'Regular health checkups help detect potential health issues early, ensuring timely intervention and better outcomes. Learn why scheduling routine visits to your doctor is essential for your well-being.'
    },
    {
      title: '5 Tips for a Healthy Lifestyle',
      date: 'March 18, 2025',
      content: 'Adopting a healthy lifestyle is easier than you think! Here are 5 simple tips, including a balanced diet, regular exercise, and proper hydration, to keep you feeling your best.'
    },
    {
      title: 'Understanding Common Cold vs. Flu',
      date: 'March 20, 2025',
      content: 'Do you have a cold or the flu? Learn how to differentiate between the two, their symptoms, and the best treatments to recover quickly and stay healthy.'
    },
    {
      title: '5 Common Myths About Visiting the Doctor – Busted!',
      date: 'April 1, 2025',
      content: 'Many people avoid doctor visits due to myths like "If I feel fine, I don’t need a checkup." In reality, routine exams, even when you feel well, can catch hidden issues early and keep you healthier in the long run.'
    },
    {
      title: 'Boosting Your Immune System Naturally: What Really Works?',
      date: 'April 4, 2025',
      content: 'Want to stay healthy year-round? Sleep well, eat colorful fruits and veggies, stay active, and manage your stress. These natural tips are proven to strengthen your immunity.'
    },
    {
      title: 'How to Prepare for Your Doctor Appointment (And Make the Most of It)',
      date: 'April 5, 2025',
      content: 'Make your next appointment more effective! Bring a list of symptoms, medications, and questions. Being honest and prepared helps your doctor give you the best care possible.'
    }
  ];
}
