import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { AddVehicleService } from '../../services/vehicle-managment/add-vehicle/add-vehicle.service';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
})
export class AddVehicleComponent {
  add = faPlus;
  vehicleName: string = '';
  vehicleYear: number = 0;
  yearOptions: number[] = [];
  insuranceExpiry!: Date;
  registrationNumber: string = '';
  rate: number = 0;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private toast: HotToastService,
    private service: AddVehicleService,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 20; i <= currentYear; i++) {
      this.yearOptions.push(i);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    if (
      !this.vehicleName.trim() ||
      !this.registrationNumber.trim() ||
      !this.vehicleYear ||
      !this.insuranceExpiry ||
      !this.rate
    ) {
      this.toast.error('Please fill all the fields');
      return;
    } else {
      const data: VehicleModel = {
        vehicleName: this.vehicleName,
        vehicleYear: this.vehicleYear,
        insuranceExpiry: this.insuranceExpiry,
        registrationNumber: this.registrationNumber,
        rate: this.rate,
      };
      this.service
        .addVehicle(data)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response.status === 200) {
            this.toast.success(response.message);
          } else this.toast.error(response.message);
        });
    }
  }
}
