
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
  formModel:any={role:null,email:'',password:'',username:''};
  showMessage:boolean=false;
  responseMessage:any;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      email: [this.formModel.email, [Validators.required, Validators.email]],
      password: [this.formModel.password, Validators.required],
      role: [this.formModel.role, Validators.required],
      username: [this.formModel.username, Validators.required]
    });
  }

  ngOnInit(): void { }

  onRegister(): void {
    if (this.itemForm.valid) {
      this.showMessage = true;
      this.responseMessage = null;
      const userData = this.itemForm.value;

      this.httpService.registerUser(userData).subscribe(
        response => {
          this.showMessage = false;
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error => {
          this.showMessage = false;
          this.responseMessage = 'Failed to register user. Please try again.';
          console.error('Registration error:', error);
        }
      );
    } else {
      this.responseMessage = 'Please fill in all required fields correctly.';
      this.itemForm.markAllAsTouched();
    }
  }
}

