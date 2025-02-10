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

  loginForm: FormGroup;
  error: string = '';


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.authService.getLoginStatus) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    this.router.navigate(['/dashboard']); // *** bypass login
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.httpService.login(loginData).subscribe(
        (response: any) => {
          // Save token and navigate to the dashboard
          this.authService.saveToken(response.token);
          this.authService.setRole(response.role);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          // Handle login error
          this.error = 'Invalid username or password. Please try again.';
        }
      );
    } else {
      this.error = 'Please fill in all fields.';
    }
  }


}




