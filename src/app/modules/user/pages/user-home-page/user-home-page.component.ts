import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { VehicleModel } from 'src/app/core/models/user/vehicelModel';
import { GetAllVehiclesService } from 'src/app/core/services/get-all-vehicles/get-all-vehicles.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
})
export class UserHomePageComponent {
  constructor(
    private service: GetAllVehiclesService,
    private toast: HotToastService
  ) {}

  vehicles: VehicleModel[] = [];
  rentModal: boolean = false;
  selectedVehicle: VehicleModel = {
    vehicleName: '',
    rent: 0,
    registrationNumber: '',
    image: '',
  };

  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.service
      .getAllVehicles()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          if (Array.isArray(response.vehicle)) {
            this.vehicles = response.vehicle.map(
              (data: any, index: number) => ({
                id: index + 1,
                vehicleName: data.vehicleName,
                rent: data.rate,
                registrationNumber: data.registrationNumber,
                image: data.photo,
              })
            );
          }
        } else this.toast.error(response.message);
      });
  }

  closeModal(): void {
    this.rentModal = false;
    this.getAllVehicles();
  }

  openModal(name: string, rate: number, registrationNumber: string): void {
    this.rentModal = true;
    this.selectedVehicle.rent = Number(rate);
    this.selectedVehicle.vehicleName = name;
    this.selectedVehicle.registrationNumber = registrationNumber;
  }
}
