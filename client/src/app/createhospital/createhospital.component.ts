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
  equipmentForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any[] = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required]
    });

    this.equipmentForm = this.formBuilder.group({
      equipmentName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      hospitalId: [null, Validators.required]
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
          this.responseMessage = 'Hospital created successfully!';
          this.getHospital();
          this.itemForm.reset();
          setTimeout(() => this.responseMessage = '', 3000);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error.message || 'Failed to create hospital';
        }
      });
    }
  }

  submitEquipment(): void {
    if (this.equipmentForm.valid) {
      const equipmentData = {
        name: this.equipmentForm.value.equipmentName,
        quantity: this.equipmentForm.value.quantity
      };
      
      this.httpService.addEquipment(this.equipmentForm.value.hospitalId ,equipmentData).subscribe({
        next: () => {
          this.showMessage = 'Equipment added successfully!';
          this.equipmentForm.reset();
          setTimeout(() => this.showMessage = '', 3000);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error.message || 'Failed to add equipment';
        }
      });
    }
  }
}



