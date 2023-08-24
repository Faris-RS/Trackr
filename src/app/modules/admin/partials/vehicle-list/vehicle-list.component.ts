import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';
import { GetVehiclesService } from '../../services/vehicle-managment/get-vehicles/get-vehicles.service';
import {
  faPen,
  faRotateLeft,
  faTrash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { DeleteVehicleService } from '../../services/vehicle-managment/delete-vehicle/delete-vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent {
  constructor(
    private service: GetVehiclesService,
    private toast: HotToastService,
    private deleter: DeleteVehicleService
  ) {}
  private ngUnsubscribe = new Subject<void>();

  edit = faPen;
  trash = faTrash;
  rentUser = faUserPlus;
  return = faRotateLeft;

  vehicles: VehicleModel[] = [];
  sortColumn: keyof VehicleModel | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';
  filteredVehicles: VehicleModel[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.retrieveVehicles();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  retrieveVehicles(): void {
    this.service
      .getAllVehicles()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.vehicles = result.vehicles.map(
          (vehicle: VehicleModel, index: number) => ({
            id: index + 1,
            ...vehicle,
          })
        );
        this.applySortAndFilter();
      });
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

  selectedVehicle: string = '';

  // Edit Vehicle Modal
  editModal: boolean = false;

  showEditModal(id: string): void {
    this.selectedVehicle = id;
    this.editModal = true;
  }

  errorEditing(): void {
    this.toast.warning('Cannot edit details of a rented vehicle');
  }

  closeEditModal(): void {
    this.editModal = false;
    this.retrieveVehicles();
  }

  // Rent Modal
  rentModal: boolean = false;

  showRentModal(id: string): void {
    this.selectedVehicle = id;
    this.rentModal = true;
  }

  closeRentModal(): void {
    this.rentModal = false;
    this.retrieveVehicles();
  }

  // Return Vehicle Modal
  returnModal: boolean = false;

  showReturnModal(id: string): void {
    this.selectedVehicle = id;
    this.returnModal = true;
  }

  closeReturnModal(): void {
    this.returnModal = false;
    this.retrieveVehicles();
  }

  // Delete Vehicle
  deleteVehicle(id: string): void {
    window.confirm(
      'Are you sure you want to delete this vehicle? This action is irreversible.'
    );
    this.loading = true;
    this.selectedVehicle = id;
    this.deleter
      .deleteVehicle(this.selectedVehicle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.toast.success(response.message);
          this.retrieveVehicles();
          this.loading = false;
        } else {
          this.toast.error(response.message);
          this.loading = false;
        }
      });
  }

  deleteError(): void {
    this.toast.warning('Cannot delete a rented vehicle');
  }
}
