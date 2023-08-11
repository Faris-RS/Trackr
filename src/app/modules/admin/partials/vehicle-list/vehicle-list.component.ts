import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';
import { GetVehiclesService } from '../../services/vehicle-managment/get-vehicles/get-vehicles.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent {
  constructor(
    private toast: HotToastService,
    private service: GetVehiclesService
  ) {}
  private ngUnsubscribe = new Subject<void>();

  vehicles: VehicleModel[] = [];
  sortColumn: keyof VehicleModel | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';
  filteredVehicles: VehicleModel[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.service
      .getAllVehicles()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.vehicles = result.vehicles.map((user: any, index: number) => ({
          id: index + 1,
          ...user,
        }));
        console.log(this.vehicles);
        
        this.applySortAndFilter();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleSort(column: keyof VehicleModel): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySortAndFilter();
  }

  applySortAndFilter(): void {
    this.applySort();
    this.applyFilter();
  }

  applySort(): void {
    if (this.sortColumn) {
      this.vehicles.sort((a, b) => {
        const aValue = a[this.sortColumn as keyof VehicleModel];
        const bValue = b[this.sortColumn as keyof VehicleModel];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return this.sortDirection === 'asc'
            ? aValue === bValue
              ? 0
              : aValue
              ? -1
              : 1
            : aValue === bValue
            ? 0
            : aValue
            ? 1
            : -1;
        }
        return 0;
      });
    }
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(
      (vehicles) =>
        vehicles.vehicleName.toLowerCase().includes(filterValue) ||
        vehicles.registrationNumber.toLowerCase().includes(filterValue)
    );
  }
}
