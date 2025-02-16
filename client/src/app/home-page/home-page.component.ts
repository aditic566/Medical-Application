// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home-page',
//   templateUrl: './home-page.component.html',
//   styleUrls: ['./home-page.component.scss']
// })
// export class HomePageComponent {

// }


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
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
      role: 'Medical Director',
      image: 'assets/images/team1.jpg'
    },
    {
      name: 'Adithya Bharatam',
      role: 'Head of Operations',
      image: 'assets/images/team2.jpg'
    },
    {
      name: 'Aman Parmar',
      role: 'Technical Lead',
      image: 'assets/images/team3.jpg'
    },
    {
      name: 'Anish Raj',
      role: 'Supply Chain Manager',
      image: 'assets/images/team4.jpg'
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
