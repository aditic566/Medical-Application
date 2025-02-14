// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-schedule-maintenance',
//   templateUrl: './schedule-maintenance.component.html',
//   styleUrls: ['./schedule-maintenance.component.scss']
// })
// export class ScheduleMaintenanceComponent implements OnInit {
//   itemForm: FormGroup;
//   formModel: any = { status: null };
//   showError: boolean = false;
//   errorMessage: any;
//   hospitalList: any[] = [];
//   assignModel: any = {};
//   showMessage: boolean = false;
//   responseMessage: any;
//   equipmentList: any[] = [];
//   isLoading: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private httpService: HttpService,
//     private router: Router,
//     private authService: AuthService,
//     private route: ActivatedRoute
//   ) {
//     this.itemForm = this.fb.group({
//       hospitalId: ['', Validators.required],
//       equipmentId: ['', Validators.required],
//       scheduledDate: ['', [Validators.required, this.dateValidator]],
//       completedDate: ['', this.dateValidator],
//       description: ['', Validators.required],
//       status: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.getHospital();
//   }

//   dateValidator(control: AbstractControl): ValidationErrors | null {
//     const datePattern = /^\d{4}-\d{2}-\d{2}$/;
//     if (!control.value || datePattern.test(control.value)) {
//       return null;
//     }
//     return { invalidDate: 'Date must be in the format YYYY-MM-DD' };
//   }

//   getHospital(): void {
//     this.httpService.getHospital().subscribe({
//       next: (data) => {
//         this.hospitalList = data;
//       },
//       error: (error) => {
//         this.showError = true;
//         this.errorMessage = error.error.message || 'Failed to load hospitals';
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.itemForm.valid) {
//       this.httpService.scheduleMaintenance(this.itemForm.value, this.itemForm.value.equipmentId).subscribe({
//         next: () => {
//           this.showMessage = true;
//           this.responseMessage = 'Maintenance scheduled successfully!';
//           this.itemForm.reset();
//           setTimeout(() => this.showMessage = false, 3000);
//         },
//         error: (error) => {
//           this.showError = true;
//           this.errorMessage = error.error.message || 'Failed to schedule maintenance';
//         }
//       });
//     }
//   }

//   onHospitalSelect(hospitalId: number): void {
//     this.httpService.getEquipmentById(hospitalId).subscribe({
//       next: (data) => {
//         this.equipmentList = data;
//       },
//       error: (error) => {
//         this.showError = true;
//         this.errorMessage = error.error.message || 'Failed to load equipment';
//       }
//     });
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.scss']
})
export class ScheduleMaintenanceComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any[] = [];
  assignModel: any = {};
  showMessage: boolean = false;
  responseMessage: any;
  equipmentList: any[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.itemForm = this.fb.group({
      hospitalId: [null, Validators.required],
      equipmentId: [null, Validators.required],
      scheduledDate: ['', [Validators.required, this.dateValidator]],
      completedDate: ['', this.dateValidator],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!control.value || datePattern.test(control.value)) {
      return null;
    }
    return { invalidDate: 'Date must be in the format YYYY-MM-DD' };
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
      this.isLoading = true;
      this.httpService.scheduleMaintenance(this.itemForm.value, this.itemForm.value.equipmentId).subscribe({
        next: () => {
          this.showMessage = true;
          this.responseMessage = 'Maintenance scheduled successfully!';
          this.itemForm.reset();
          this.isLoading = false;
          setTimeout(() => this.showMessage = false, 3000);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error.message || 'Failed to schedule maintenance';
          this.isLoading = false;
        }
      });
    }
  }

  onHospitalSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;

    const hospitalId = Number(target.value); // Convert to number
    console.log(hospitalId)
    this.httpService.getEquipmentById(hospitalId).subscribe({
      next: (data) => {
        console.log(data)
        this.equipmentList = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error.error.message || 'Failed to load equipment';
      }
    });
  }
}
