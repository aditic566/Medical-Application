
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

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: [null, Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const userData = this.itemForm.value;

      this.httpService.register(userData).subscribe(
        response => {
          this.isLoading = false;
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'Failed to register user. Please try again.';
          console.error('Registration error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}

