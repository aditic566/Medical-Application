import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  IsLoggin: any = false;
  roleName: string | null | undefined;

  constructor(private authService: AuthService, private router: Router) {}
  //   this.IsLoggin = this.authService.getLoginStatus;
  //   console.log('IsLoggin: ', this.IsLoggin);

  //   this.roleName = this.authService.getRole;
  //   console.log('--roleName:--', this.roleName);


  //   if (!this.IsLoggin) {
  //     this.router.navigateByUrl('/login');
  //   }
  // }
  ngOnInit(): void {

  


  }
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
