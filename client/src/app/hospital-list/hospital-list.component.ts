

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
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
  hospitalId: number | null | undefined;
  isEditMode: boolean = false; // Flag to determine if in edit mode
  currentEquipmentId: number | null = null; // To hold the current equipment ID being edited

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
    this.getEquipmentByHospitalId(hospital.id);
    this.showHospitalList = false; // Hide hospital list
  }

  deleteHospital(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this hospital?');
    if (confirmed) {
      this.httpService.deleteHospital(id).subscribe(
        response => {
          this.hospitalList = this.hospitalList.filter(hospital => hospital.id !== id);
        },
        error => {
          this.errorMessage = 'Failed to delete hospital';
        }
      );
    }
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

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      const equipmentData = {
        name: this.equipmentForm.value.equipmentName,
        description: this.equipmentForm.value.description
      };

      if (this.isEditMode) {
        this.updateEquipment(this.currentEquipmentId!, equipmentData);
      } else {
        this.addEquipment(equipmentData);
      }
    }
  }

  addEquipment(equipmentData: any): void {
    this.httpService.addEquipment(this.selectedHospital?.id!, equipmentData).subscribe(
      response => {
        this.equipmentList.push(response);
        this.equipmentForm.reset();
        this.hideModal();
      },
      error => {
        this.errorMessage = 'Failed to add equipment';
      }
    );
  }

  editEquipment(equipment: any): void {
    this.isEditMode = true;
    this.currentEquipmentId = equipment.id;
    this.equipmentForm.patchValue({
      equipmentName: equipment.name,
      description: equipment.description,
      hospitalId: this.selectedHospital?.id
    });
    this.showModal('edit', equipment);
  }

  updateEquipment(equipmentId: number, equipmentData: any): void {
    this.httpService.updateEquipment(equipmentId, equipmentData).subscribe(
      response => {
        const index = this.equipmentList.findIndex(e => e.id === equipmentId);
        this.equipmentList[index] = response;
        this.equipmentForm.reset();
        this.hideModal();
      },
      error => {
        this.errorMessage = 'Failed to update equipment';
      }
    );
  }

  deleteEquipment(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this equipment?');
    if (confirmed) {
      this.httpService.deleteEquipment(id).subscribe(
        response => {
          this.equipmentList = this.equipmentList.filter(equipment => equipment.id !== id);
        },
        error => {
          this.errorMessage = 'Failed to delete equipment';
        }
      );
    }
  }

  showModal(mode: string, equipment?: any): void {
    console.log('clicked in add hospital');
    
    this.showAddEquipmentForm = true;
    this.isEditMode = mode === 'edit';
    if (this.isEditMode && equipment) {
      this.currentEquipmentId = equipment.id;
      this.equipmentForm.patchValue({
        equipmentName: equipment.name,
        description: equipment.description,
        hospitalId: this.selectedHospital?.id
      });
    } else {
      this.equipmentForm.reset();
    }
  }

  hideModal(): void {
    this.showAddEquipmentForm = false;
    this.isEditMode = false;
    this.currentEquipmentId = null;
  }
}
