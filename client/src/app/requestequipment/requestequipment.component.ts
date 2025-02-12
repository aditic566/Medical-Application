import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

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
   private formBuilder:FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      hospitalId: ['', Validators.required],
      equipmentId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      orderDate: ['', Validators.required],
      description: ['', Validators.required]
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
}

