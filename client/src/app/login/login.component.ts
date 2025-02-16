import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  itemForm: FormGroup;
  error: string = '';
  roleName: string | null | undefined;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.authService.getLoginStatus) {
      this.roleName = this.authService.getRole;
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.login(this.itemForm.value).subscribe(
        (response: any) => {
          this.authService.saveToken(response.token);
          this.authService.setRole(response.role);
          this.authService.setUsername(response.username);
          this.authService.setLoginStatus();
          this.roleName = this.authService.getRole;
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          this.error = 'Invalid username or password. Please try again.';
        }
      );
    } else {
      this.error = 'Please fill in all fields.';
    }
  }
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}

