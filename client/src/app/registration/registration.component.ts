
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  passwordStrengthClass: string = '';
  passwordStrengthText: string = '';
  passwordStrengthColor: string = '';

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [null, Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  checkPasswordStrength() {
    const password = this.itemForm.get('password')?.value;

    if (!password) {
      this.passwordStrengthClass = '';
      this.passwordStrengthText = '';
      this.passwordStrengthColor = '';
      return;
    }

    if (password.length < 5) {
      this.passwordStrengthClass = 'weak';
      this.passwordStrengthText = 'Weak Password';
      this.passwordStrengthColor = '#e74c3c';
    } else if (password.length < 9) {
      this.passwordStrengthClass = 'medium';
      this.passwordStrengthText = 'Medium Password';
      this.passwordStrengthColor = '#f1c40f';
    } else {
      this.passwordStrengthClass = 'strong';
      this.passwordStrengthText = 'Strong Password';
      this.passwordStrengthColor = '#2ecc71';
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const userData = this.itemForm.value;

      this.httpService.register(userData).subscribe(
        response => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'User with this email already exists. Please login.';
          console.error('Registration error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
