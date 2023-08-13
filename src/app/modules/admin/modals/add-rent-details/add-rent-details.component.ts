import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RentData, UserData } from 'src/app/core/models/admin/userModel';
import { RentVehicleService } from '../../services/vehicle-managment/rent-vehicles/rent-vehicle.service';
import { HotToastService } from '@ngneat/hot-toast';
import { GetUsersService } from '../../services/get-users/get-users.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-rent-details',
  templateUrl: './add-rent-details.component.html',
  styleUrls: ['./add-rent-details.component.css'],
})
export class AddRentDetailsComponent {
  @Input() selectedVehicle: string = '';
  @Output() closeModal = new EventEmitter<void>();

  cancel = faXmark;

  constructor(
    private toast: HotToastService,
    private rent: RentVehicleService,
    private users: GetUsersService
  ) {}

  private ngUnsubscribe = new Subject<void>();

  people: UserData[] = [];
  rentedBy: string = '';
  returnDate!: Date;
  rentedDate!: Date;
  rentedUserOptions: string[] = [];
  rentedUserMail: string[] = [];

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.users
      .getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.people = response.users;
        this.populateRentedUserOptions();
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

  close(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (!this.rentedBy.trim() || !this.returnDate || !this.rentedUserOptions) {
      this.toast.error('Please fill all the fields');
      return;
    } else {
      const selectedIndex = this.rentedUserOptions.indexOf(this.rentedBy);
      if (selectedIndex !== -1) {
        const selectedEmail = this.rentedUserMail[selectedIndex];
        const data: RentData = {
          rentedBy: this.rentedBy,
          rentedDate: this.rentedDate,
          returnDate: this.returnDate,
          email: selectedEmail,
          selectedVehicle: this.selectedVehicle,
        };
        this.rent
          .rentVehicle(data)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((response) => {
            if (response.status === 200) {
              this.toast.success(response.message);
              this.closeModal.emit();
            } else this.toast.error(response.message);
          });
      }
    }
  }
}
