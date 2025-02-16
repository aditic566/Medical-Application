


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  roleName: string | null | undefined;
  username: string | null | undefined;
  showHospitalList: boolean = false;
  currentTime: Date = new Date();
  showLogoutConfirmation: boolean = false;
 

  cards = [
    {
      title: 'Create Hospital',
      icon: 'hospital-user',
      route: '/createhospital',
      bgColor: '#344CB7',
      stats: '',
      description: 'Register and configure new medical facilities',
      action: 'Add New',
      role: 'HOSPITAL'
    },
    {
      title: 'View Hospitals',
      icon: 'hospital',
      route: '/hospital-list',
      bgColor: '#34a853',
      stats: '',
      description: 'Monitor and manage registered facilities',
      action: 'View All',
      role: 'HOSPITAL'
    },
    {
      title: 'Schedule Maintenance',
      icon: 'calendar-check',
      route: '/schedule-maintenance',
      bgColor: '#FF9D23',
      stats: '',
      description: 'Plan equipment maintenance schedules',
      action: 'Schedule',
      role: 'HOSPITAL'
    },
    {
      title: 'Request Equipment',
      icon: 'tools',
      route: '/requestequipment',
      bgColor: '#81BFDA',
      stats: '',
      description: 'Submit urgent maintenance requests',
      action: 'Request',
      role: 'HOSPITAL'
    },
    {
      title: 'View Orders',
      icon: 'tools',
      route: '/orders',
      bgColor: '#ea4335',
      stats: '',
      description: 'View and update equipment orders',
      action: 'View',
      role: 'SUPPLIER'
    },
    {
      title: 'View Maintenance',
      icon: 'tools',
      route: '/maintenance',
      bgColor: '#ea4335',
      stats: '',
      description: 'View and update the maintenance requests',
      action: 'View',
      role: 'TECHNICIAN'
    }
  ];

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.roleName = this.authService.getRole;
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.roleName = this.authService.getRole;
    this.username = this.authService.getUsername;
    this.httpService.getHospital().subscribe((data) => {
      this.cards[1].stats = `${data.length} Listed`;
    });

    this.httpService.getMaintenance().subscribe((data) => {
      this.cards[2].stats = `${data.length} Scheduled`;
    });

    this.httpService.getorders().subscribe((data) => {
      this.cards[3].stats = `${data.length} Ordered`;
    });
  }

  navigateToCard(card: any) {
    this.router.navigate([card.route]);
  }

  showLogoutModal() {
    this.showLogoutConfirmation = true;
  }

  closeLogoutModal() {
    this.showLogoutConfirmation = false;
  }

  confirmLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeLogoutModal();
  }
}

