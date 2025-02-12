import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss']
})
export class CreatehospitalComponent implements OnInit {
  itemForm: FormGroup;
  equipmentForm: FormGroup;
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel: any={};
  showMessage: any;
  responseMessage: any;

  constructor(private router:Router,private httpService:HttpService,private formBuilder:FormBuilder){
    this.itemForm=this.formBuilder.group({
      name:[this.formModel.name,[Validators.required]],
      location:[this.formModel.location,[Validators.required]]
    });

    this.equipmentForm=this.formBuilder.group({
      name:[this.formModel.name,[Validators.required]],
      description:[this.formModel.description,[Validators.required]],
      hospitalId:[this.formModel.hospitalId,[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  getHospital():void{
    this.httpService.getHospital().subscribe({
      next: (data:any)=>{
      this.hospitalList=data;
      console.log(this.hospitalList);
    },
    error:(error)=>{
      this.showError=true;
      this.errorMessage="Error occurred";
      console.error('Login error: ',error);
    }
    });
  }

  onSubmit(){
    if(this.itemForm.valid){
      if(this.itemForm.valid){
        this.showError=false;
        this.httpService.createHospital(this.itemForm.value).subscribe({
          next: (data:any)=>{
            this.itemForm.reset();
            this.getHospital();
          },
          error: (error)=>{
            this.showError=true;
            this.errorMessage="Error occurred";
            console.log('Login error: ',error);
          }
        });
      }else{
        this.itemForm.markAllAsTouched();
      }
    }
    else{
      this.itemForm.markAllAsTouched();
    }
  }

  Addequipment(value:any){
    this.equipmentForm.controls['hospital'].setValue(value.id);
  }

  submitEquipment():void{
    if(this.equipmentForm.value){
      this.showMessage=false;
      this.httpService.addEquipment(this.equipmentForm.value,this.equipmentForm.controls['hospitalId'].value).subscribe({
        next: (data:any)=>{
          this.showMessage=true;
          this.responseMessage="Equipment added successfully!";
        },error:(error)=>{
          this.showError=true;
          this.errorMessage="Error occurred";
          console.log('Login error:',error);
        }
      });
    }else{
      this.equipmentForm.markAllAsTouched();
    }
  }
}

