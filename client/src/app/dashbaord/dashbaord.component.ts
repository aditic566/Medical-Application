import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  roleName: string | null | undefined;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.roleName = this.authService.getRole;
  }


}
