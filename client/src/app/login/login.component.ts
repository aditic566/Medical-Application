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
  formModel:any={};
  showError:boolean=false;
  errorMessage:any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.itemForm = this.fb.group({
      username: [this.formModel.username, [Validators.required]],
      password: [this.formModel.password, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.authService.getLoginStatus) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    // this.router.navigate(['/dashboard']); 
    if (this.itemForm.valid) {
      this.showError=false;
      const loginData = this.itemForm.value;
      this.httpService.Login(loginData).subscribe((data:any)=>{
        if(data.userNo!=0) {
          // Save token and navigate to the dashboard
          this.authService.setRole(data.role);
          this.authService.saveToken(data.token);
          this.router.navigate(['/dashboard']);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }else{
          this.showError=true;
          this.errorMessage='Wrong user or password';
        }
      },
      error => {
        // Handle login error
        this.showError=true;
        this.errorMessage = 'Invalid username or password. Please try again.';
        console.error('Login error: ',error);
      }
    );
  }else {
      this.itemForm.markAllAsTouched();
      //this.errorMessage = 'Please fill in all fields.';
    }
  }

  registration():void{
    this.router.navigate(['/registration']);
  }
}


