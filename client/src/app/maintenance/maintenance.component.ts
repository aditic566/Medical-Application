import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //todo: complete missing code...
  maintenanceList: any[] = [];
  itemForm: FormGroup;
  error: string = '';

  constructor(private httpService: HttpService,private formBuilder: FormBuilder){
    this.itemForm = this.formBuilder.group({
      scheduledDate: [null, [Validators.required]],
      completedDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      status: [null, [Validators.required]],
      maintenanceId: [null]
    });
  }

  ngOnInit(): void {
    this.loadMaintenance();
    
  }

  loadMaintenance(): void {
    this.httpService.getMaintenance().subscribe({
      next: (data) => {
        this.maintenanceList = data;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to load maintenance records';
      }
    });
  }

  onSubmit():void{
    if (this.itemForm.valid) {
      const formData = { ...this.itemForm.value, maintenanceId: this.itemForm.value.maintenanceId };
      this.httpService.updateMaintenance(formData.maintenanceId, formData).subscribe({
        next: () => {
          this.loadMaintenance();
          this.itemForm.reset();
        },
        error: (error) => {
          this.error = error.error.message || 'Failed to update maintenance record';
        }
      });
    }
  }

}

