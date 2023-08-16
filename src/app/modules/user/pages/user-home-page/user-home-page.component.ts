import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { VehicelModel } from 'src/app/core/models/user/vehicelModel';
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

  vehicles: VehicelModel[] = [];

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
              })
            );
            console.log(this.vehicles);
          }
        } else this.toast.error(response.message);
      });
  }
}
