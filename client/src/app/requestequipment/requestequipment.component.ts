
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

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
  equipmentList: any[] = [];
  assignModel: any = {};
  showMessage: boolean = false;
  responseMessage: any;

  error: string = '';
  success: string = '';

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      hospitalId: ['', Validators.required],
      equipmentId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      orderDate: ['', [Validators.required, this.futureDateValidator]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to midnight for comparison

    if (selectedDate < today) {
      return { 'pastDate': true };
    }
    return null;
  }


  get todayString(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
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

  onHospitalSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const hospitalId = Number(target.value); // Convert to number
    if (hospitalId) {
      this.httpService.getEquipmentById(hospitalId).subscribe({
        next: (data) => {
          this.equipmentList = data;
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error.message || 'Failed to load equipment';
        }
      });
    } else {
      this.equipmentList = [];
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const order = {
        quantity: this.itemForm.value.quantity,
        description: this.itemForm.value.description,
        orderDate: this.itemForm.value.orderDate
      };

      this.httpService.orderEquipment(order, this.itemForm.value.equipmentId).subscribe({
        next: () => {
          this.showMessage = true;
          this.responseMessage = 'Equipment order placed successfully';
          this.itemForm.reset();
          setTimeout(() => this.showMessage = false, 3000);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error.message || 'Failed to place order';
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
