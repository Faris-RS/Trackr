import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';
import { GetSelectedVehicleService } from '../../services/edit-vehicle/get-current-vehicle/get-selected-vehicle.service';
import { DatePipe } from '@angular/common';
import { UserData } from 'src/app/core/models/admin/userModel';
import { GetUsersService } from '../../services/get-users/get-users.service';

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

  constructor(
    private toast: HotToastService,
    private getVehicle: GetSelectedVehicleService,
    private datePipe: DatePipe,
    private users: GetUsersService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 20; i <= currentYear; i++) {
      this.yearOptions.push(i);
    }
  }

  private ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.getVehicleDetails();
    this.users
      .getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.people = response.users;
        this.populateRentedUserOptions();
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
    this.getVehicle
      .getSelectedVehicle(this.selectedVehicle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.vehicleData = response.vehicle;
        } else this.toast.error(response.message);
      });
  }

  populateRentedUserOptions() {
    for (let i = 0; i < this.people.length; i++) {
      this.rentedUserOptions.push(
        this.people[i].firstName + ' ' + this.people[i].lastName
      );
      this.rentedUserMail.push(this.people[i].email);
    }
  }

  onSubmit() {
    console.log('Edit functionality not yet implemented');
  }
}
