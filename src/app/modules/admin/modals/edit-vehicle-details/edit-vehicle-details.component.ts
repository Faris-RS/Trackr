import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';
import { GetSelectedVehicleService } from '../../services/vehicle-managment/edit-vehicle/get-current-vehicle/get-selected-vehicle.service';
import { DatePipe } from '@angular/common';
import { UserData } from 'src/app/core/models/admin/userModel';
import { GetUsersService } from '../../services/user-managment/get-users/get-users.service';
import { EditVehicleService } from '../../services/vehicle-managment/edit-vehicle/edit-vehicle/edit-vehicle.service';

@Component({
  selector: 'app-edit-vehicle-details',
  templateUrl: './edit-vehicle-details.component.html',
  styleUrls: ['./edit-vehicle-details.component.css'],
})
export class EditVehicleDetailsComponent {
  @Input() selectedVehicle: string = '';
  @Output() closeModal = new EventEmitter<void>();

  cancel = faXmark;
  vehicleData!: VehicleModel;
  yearOptions: number[] = [];
  people: UserData[] = [];
  rentedUserOptions: string[] = [];
  rentedUserMail: string[] = [];
  dataChanged: boolean = false;
  originalFormValues!: VehicleModel;
  loading: boolean = false;

  constructor(
    private toast: HotToastService,
    private getVehicle: GetSelectedVehicleService,
    private datePipe: DatePipe,
    private users: GetUsersService,
    private service: EditVehicleService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 20; i <= currentYear; i++) {
      this.yearOptions.push(i);
    }
  }

  private ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.loading = true;
    this.getVehicleDetails();
    this.users
      .getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.people = response.users;
        this.populateRentedUserOptions();
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  close() {
    this.closeModal.emit();
  }

  getFormattedDate(date: any): string {
    // Format the date using the DatePipe
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  getVehicleDetails(): void {
    this.loading = true;
    this.getVehicle
      .getSelectedVehicle(this.selectedVehicle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.vehicleData = response.vehicle;
          this.originalFormValues = { ...this.vehicleData };
          this.loading = false;
        } else {
          this.toast.error(response.message);
          this.loading = false;
        }
      });
  }

  populateRentedUserOptions() {
    this.loading = true;
    for (let i = 0; i < this.people.length; i++) {
      this.rentedUserOptions.push(
        this.people[i].firstName + ' ' + this.people[i].lastName
      );
      this.rentedUserMail.push(this.people[i].email);
    }
    this.loading = false;
  }

  checkForChanges(): boolean {
    return (
      JSON.stringify(this.vehicleData) !==
      JSON.stringify(this.originalFormValues)
    );
  }

  onSubmit() {
    if (
      !this.vehicleData.vehicleName.trim() ||
      !this.vehicleData.registrationNumber.trim() ||
      !this.vehicleData.vehicleYear ||
      !this.vehicleData.insuranceExpiry ||
      !this.vehicleData.rate
    ) {
      this.toast.error('Please fill all the fields');
      return;
    } else {
      this.loading = true;
      if (!this.dataChanged) {
        this.toast.info('No changes were made.');
        this.closeModal.emit();
        return;
      } else {
        if (this.checkForChanges()) {
          this.service
            .editVehicle(this.vehicleData)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
              this.toast.success(response.message);
              this.closeModal.emit();
              this.loading = false;
            });
        } else {
          this.toast.info('No changes were made.');
          this.closeModal.emit();
          this.loading = false;
          return;
        }
      }
    }
  }
}
