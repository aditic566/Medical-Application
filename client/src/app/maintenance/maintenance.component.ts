import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
// import { switchScan } from 'rxjs';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel: any={};
  itemForm: FormGroup;
  showMessage: any;
  responseMessage: any;
  maintenanceList: any=[];
  maintenanceObj: any={};


  constructor(private httpService: HttpService,private formBuilder: FormBuilder){
    this.itemForm = this.formBuilder.group({
      scheduledDate: [this.formModel.scheduleMaintenance, [Validators.required,this.dateValidator]],
      completedDate: [this.formModel.completedDate, [Validators.required,this.dateValidator]],
      description: [this.formModel.description, [Validators.required]],
      status: [this.formModel.status, [Validators.required]],
      maintenanceId: [this.formModel.maintenanceId]
    });
  }

  ngOnInit(): void {
    this.getMaintenance();
  }

  dateValidator(control:AbstractControl):ValidationErrors|null{
    const date=/^\d{4}-\d{2}-\d{2}$/;
    if(!date.test(control.value)){
      return {invalidDate:true};
    }
    return null;
  }
  getMaintenance() {
    this.httpService.getMaintenance().subscribe({
      next: (data) => {
        this.maintenanceList = data;
        console.log(data);
      },
      error: (error) => {
        this.showError=true;
        this.errorMessage = 'Failed to load maintenance records';
        console.log('Login error:',error);
      }
    });
  }

  viewDetails(data:any){
    this.maintenanceObj={};
    this.maintenanceObj=data.equipment;
  }

  edit(val:any){
    const scheduledDate=new Date(val.scheduledDate); 
    const completedDate=new Date(val.completedDate);
    this.itemForm.patchValue({
      // switchScaned
    })
  }

  update(){
    if (this.itemForm.valid) {
      const formData = { ...this.itemForm.value, maintenanceId: this.itemForm.value.maintenanceId };
      this.httpService.updateMaintenance(formData,formData.maintenanceId).subscribe({
        next: () => {
          this.showMessage = true;
                this.responseMessage = 'Maintenance updated successfully!';
                this.itemForm.reset();
                this.getMaintenance();
        },
        error:() => {
             this.showError = true;
             this.errorMessage = 'Failed to update maintenance record';
        }
      });
    }else {
            this.showError = true;
            this.errorMessage = 'Please fill out all required fields correctly.';
     }
  }

}

