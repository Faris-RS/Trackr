import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AddVehicleService } from '../../services/vehicle-managment/add-vehicle/add-vehicle.service';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';
import { HotToastService } from '@ngneat/hot-toast';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
})
export class AddVehicleComponent implements OnInit, OnDestroy {
  add = faPlus;
  vehicleForm!: FormGroup;
  yearOptions: number[] = [];
  loading: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private service: AddVehicleService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 20; i <= currentYear; i++) {
      this.yearOptions.push(i);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      vehicleName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      insuranceExpiry: [''],
      vehicleYear: [null],
      rate: [0],
      photo: [''],
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) {
      this.toast.error('Please fill all the required fields');
      return;
    }

    const data: VehicleModel = {
      ...this.vehicleForm.value,
    };
    this.loading = true;
    this.service
      .addVehicle(data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.toast.success(response.message);
          this.loading = false;
        } else {
          this.toast.error(response.message);
          this.loading = false;
        }
      });
  }

  handleFileChange(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.loading = true;
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const imageData = reader.result;
        if (typeof imageData === 'string') {
          this.vehicleForm.patchValue({
            photo: imageData,
          });
          this.loading = false;
        } else {
          this.toast.error('Error reading image data');
          this.loading = false;
        }
      };
    }
  }
}
