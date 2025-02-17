import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

// import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any[] = [];
  assignModel: any = {};
  itemForm: FormGroup;
  showMessage: any;
  responseMessage: any;
  maintenanceList: any[] = [];
  maintenanceObj: any = {};

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {
    this.itemForm = this.formBuilder.group({
      scheduledDate: [null, [Validators.required, this.dateValidator]],
      completedDate: [null, [Validators.required, this.dateValidator]],
      description: [null, [Validators.required]],
      status: [null, [Validators.required]],
      maintenanceId: [null]
    });
  }

  ngOnInit(): void {
    this.getMaintenance();
  }

  getMaintenance(): void {
    this.httpService.getMaintenance().subscribe({
      next: (data) => {
        this.maintenanceList = data;
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error.error.message || 'Failed to load maintenance records';
      }
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!control.value || datePattern.test(control.value)) {
      return null;
    }
    return { invalidDate: 'Date must be in the format YYYY-MM-DD' };
  }

  updateCompletionDate(maintenance: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    const newDate = target.value;
    if (newDate) {
      maintenance.completedDate = newDate;
      this.updateMaintenance(maintenance);
    }
  }

  updateStatus(maintenance: any, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value;
    if (newStatus) {
      maintenance.status = newStatus;
      this.updateMaintenance(maintenance);
    }
  }

  updateMaintenance(maintenance: any): void {
    this.httpService.updateMaintenance(maintenance, maintenance.id).subscribe({
      next: () => {
        this.showMessage = true;
        this.responseMessage = 'Maintenance record updated successfully!';
        this.getMaintenance();
        setTimeout(() => this.showMessage = false, 3000);
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error.error.message || 'Failed to update maintenance record';
        console.error(`Failed to update maintenance record ID ${maintenance.id}:`, error);
      }
    });
  }

  goBack() {
    this.route.navigate(['/dashboard']);
  }

}




