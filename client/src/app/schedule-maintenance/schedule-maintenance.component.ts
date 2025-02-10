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
  isLoading: boolean = false;
  errorMessage: string | null = null;
  equipmentId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.itemForm = this.fb.group({
      scheduledDate: ['', Validators.required],
      completedDate: [''],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic if necessary
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      this.equipmentId = this.route.snapshot.params['id'];
      if (this.equipmentId) {
        this.httpService.scheduleMaintenance(this.equipmentId, this.itemForm.value).subscribe(
          response => {
            this.isLoading = false;
            console.log('Maintenance scheduled successfully:', response);
            this.router.navigate(['/maintenance']); // Navigate to the maintenance list page after successful creation
          },
          error => {
            this.isLoading = false;
            this.errorMessage = 'Failed to schedule maintenance. Please try again.';
            console.error('Creation error:', error);
          }
        );
      }


    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
