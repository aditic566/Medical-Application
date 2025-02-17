
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss']
})
export class CreatehospitalComponent implements OnInit {
  itemForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';
  hospitalList: any[] = [];

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  getHospital(): void {
    this.httpService.getHospital().subscribe({
      next: (data) => {
        this.hospitalList = data;
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error.error.message || 'Failed to load hospitals';
      }
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.createHospital(this.itemForm.value).subscribe({
        next: () => {
          this.showMessage = true;
          this.responseMessage = 'Hospital added successfully!';
          this.getHospital();
          this.itemForm.reset();
          setTimeout(() => this.showMessage = false, 3000);
          // this.router.navigate(['/']);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error.message || 'Failed to create hospital';
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}

