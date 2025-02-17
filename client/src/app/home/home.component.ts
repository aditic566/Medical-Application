import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSlide = 0;

  slides = [
    {
      image: './assets/hospital.jpg',
      title: 'Modern Healthcare Facility',
      description: 'Simplify equipment management for smoother healthcare operations.'
    },
    {
      image: './assets/technician.jpg',
      title: 'Expert Technicians',
      description: 'Real-time maintenance and efficient service updates.'
    },
    {
      image: './assets/supplier.jpg',
      title: 'Reliable Suppliers',
      description: 'Quickly fulfill equipment needs with reliable deliveries.'
    }
  ];

  teamMembers = [
    {
      name: 'Aditi Choudhary',
      role: 'Developer'

    },
    {
      name: 'Adithya Bharatam',
      role: 'Developer'

    },
    {
      name: 'Aman Parmar',
      role: 'Developer'

    },
    {
      name: 'Anish Raj',
      role: 'Developer'

    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }

  private startSlideshow(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
