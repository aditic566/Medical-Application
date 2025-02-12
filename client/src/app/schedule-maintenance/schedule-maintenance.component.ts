// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-schedule-maintenance',
//   templateUrl: './schedule-maintenance.component.html',
//   styleUrls: ['./schedule-maintenance.component.scss']
// })
// export class ScheduleMaintenanceComponent {

// }
// //todo: complete missing code




import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.scss']
})

export class ScheduleMaintenanceComponent implements OnInit {
  itemForm: FormGroup;
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel: any={};
  showMessage: any;
  responseMessage: any;
  equipmentList: any=[];

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    // private route: ActivatedRoute
  ) {
    this.itemForm = this.fb.group({
      scheduledDate: [this.formModel.scheduledDate,this.dateValidator],
      completedDate: [this.formModel.completedDate,this.dateValidator],
      description: [this.formModel.description, Validators.required],
      status: [this.formModel.status, Validators.required],
      equipmentId:[this.formModel.equipmentId],
      hospitalId:[this.formModel.hospitalId]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  dateValidator(control:AbstractControl):ValidationErrors|null{
    const date=/^\d{4}-\d{2}-\d{2}$/;
    if(!date.test(control.value)){
      return {invalidDate:true};
    }
    return null;
  }

  getHospital(){
    this.httpService.getHospital().subscribe(
      (data: any) => {
        this.hospitalList = data;
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message;
      }
    );
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.scheduleMaintenance(this.itemForm.value, this.itemForm.value.equipmentId).subscribe(
        (response: any) => {
          this.showMessage = true;
          this.responseMessage = 'Maintenance scheduled successfully!';
          this.itemForm.reset();
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  onHospitalSelect() {
    const hospitalId=this.itemForm.get('hospitalId')?.value;
    this.httpService.getEquipmentById(hospitalId).subscribe(
      (data: any) => {
        this.equipmentList = data;
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message;
      }
    );
  }


}
