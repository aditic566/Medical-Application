import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
// import { Hospital } from '../models/hospital.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent implements OnInit {
  hospitalList: any[] = [];
  errorMessage: string | null = null;
  selectedHospital: any | null = null;
  showAddEquipmentForm: boolean = false;
  equipmentList: any[] = [];
  equipmentForm: FormGroup;
  showHospitalList: boolean = true; // Flag to control visibility of the hospital list
  hospitalId: number | null | undefined

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.equipmentForm = this.fb.group({
      equipmentName: ['', Validators.required],
      description: ['', Validators.required],
      hospitalId: [null]
    });
  }

  ngOnInit(): void {
    this.getHospitals();

  }

  getHospitals(): void {
    this.httpService.getHospital().subscribe(
      (data: any[]) => {
        this.hospitalList = data;
      },
      error => {
        this.errorMessage = 'Failed to load hospitals';
      }
    );
  }

  viewHospital(hospital: any): void {
    this.selectedHospital = hospital;
    this.hospitalId = this.selectedHospital.id;
    console.log(this.hospitalId);

    this.getEquipmentByHospitalId(hospital.id);
    console.log(hospital.id)

    this.showHospitalList = false; // Hide hospital list
  }

  editHospital(hospital: any): void {
    // this.router.navigate(['/hospital/edit', hospital.id]);
  }

  deleteHospital(id: number): void {
    // this.httpService.deleteHospital(id).subscribe(
    //   response => {
    //     this.hospitalList = this.hospitalList.filter(hospital => hospital.id !== id);
    //   },
    //   error => {
    //     this.errorMessage = 'Failed to delete hospital';
    //   }
    // );

  }

  closeView(): void {
    this.selectedHospital = null;
    this.showAddEquipmentForm = false;
    this.equipmentList = [];
    this.showHospitalList = true; // Show hospital list
  }

  getEquipmentByHospitalId(hospitalId: number): void {
    this.httpService.getEquipmentById(hospitalId).subscribe(
      (data: any[]) => {
        this.equipmentList = data;
      },
      error => {
        this.errorMessage = 'Failed to load equipment for the selected hospital';
      }
    );
  }

  addEquipment(): void {
    if (this.equipmentForm.valid) {
      console.log('form valid:', this.equipmentForm.value);

      console.log('selectedHospital:', this.selectedHospital.id);


      const equipmentData = {
        name: this.equipmentForm.value.equipmentName,
        description: this.equipmentForm.value.description

      }
      console.log(equipmentData)
      this.httpService.addEquipment(this.selectedHospital?.id!, equipmentData).subscribe(
        response => {
          this.equipmentList.push(response);
          this.equipmentForm.reset();
          this.showAddEquipmentForm = false;

          console.log('this.equipmentList: ', this.equipmentList);
          console.log('this.equipmentForm: ', this.equipmentForm);

          console.log('this.showAddEquipmentForm: ' + this.showAddEquipmentForm);

        },
        error => {
          this.errorMessage = 'Failed to add equipment';
        }
      );
    }
  }

  editEquipment(equipment: any): void {
    // Implement edit functionality here
  }

  deleteEquipment(id: number): void {
    // this.httpService.deleteEquipment(id).subscribe(
    //   response => {
    //     this.equipmentList = this.equipmentList.filter(equipment => equipment.id !== id);
    //   },
    //   error => {
    //     this.errorMessage = 'Failed to delete equipment';
    //   }
    // );
  }
}
