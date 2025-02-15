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
          console.log('--logged in--');
          
          this.authService.saveToken(response.token);
          console.log('--token saved--');

          this.authService.setRole(response.role);
          console.log('--role saved--');

          this.authService.setUsername(response.username);
          console.log('--username saved--');

          this.authService.setLoginStatus();
          console.log('--login status saved--');

          this.roleName = this.authService.getRole;
          console.log('--roleName--', this.roleName);
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

    // Add this property
  showPassword = false;
 
// Add this method
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


}






// ==============

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';
 
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
 
//   loginForm: FormGroup;
//   error: string = '';
 
 
//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private authService: AuthService,
//     private httpService: HttpService
//   ) {
//     this.loginForm = this.fb.group({
//       username: ['', [Validators.required]],
//       password: ['', [Validators.required]]
//     });
//   }
 
//   ngOnInit(): void {
//     // if (this.authService.getLoginStatus) {
//     //   this.router.navigate(['/dashboard']);
//     // }
//   }
 
//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       const loginData = this.loginForm.value;
 
//       this.httpService.Login(loginData).subscribe(
//         (response: any) => {
//           // Save token and navigate to the dashboard
//           this.authService.saveToken(response.token);
//           this.authService.setRole(response.role);
//           this.authService.setLoginStatus();
//           this.router.navigate(['/dashboard']);
//         },
//         (error: any) => {
//           // Handle login error
//           this.error = 'Invalid username or password. Please try again.';
//         }
//       );
//     } else {
//       this.error = 'Please fill in all fields.';
//     }
//   }
 
//   // Add this property
// showPassword = false;
 
// // Add this method
// togglePassword(): void {
//   this.showPassword = !this.showPassword;
// }
 
 
 
// }