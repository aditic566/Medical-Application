import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-requestequipment',
  templateUrl: './requestequipment.component.html',
  styleUrls: ['./requestequipment.component.scss']
})
export class RequestequipmentComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any[] = [];
  assignModel: any = {};
  showMessage: boolean = false;
  responseMessage: any;
  equipmentList: any[] = [];
 
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      orderDate: ['', [Validators.required, this.dateValidator]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      status: [null, Validators.required],
      equipmentId: ['', Validators.required],
      hospitalId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.getHospital();
  }
 
  getHospital(): void {
    this.httpService.getHospital().subscribe(
      (data: any[]) => {
        this.hospitalList = data;
      },
      error => {
        this.errorMessage = 'Failed to load hospitals';
        this.showError = true;
      }
    );
  }
 
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(control.value) ? null : { invalidDate: true };
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.showError = false;
      this.showMessage = false;
      this.httpService.orderEquipment(this.itemForm.value, this.itemForm.get('equipmentId')?.value).subscribe(
        response => {
          this.responseMessage = 'Equipment ordered successfully!';
          this.showMessage = true;
          this.itemForm.reset();
        },
        error => {
          this.errorMessage = 'Failed to order equipment. Please try again.';
          this.showError = true;
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.showError = true;
    }
  }
 
  onHospitalSelect(): void {
    const hospitalId = this.itemForm.get('hospitalId')?.value;
    this.httpService.getEquipmentById(hospitalId).subscribe(
      (data: any[]) => {
        this.equipmentList = data;
      },
      error => {
        this.errorMessage = 'Failed to load equipment for the selected hospital';
        this.showError = true;
      }
    );
  }
}
