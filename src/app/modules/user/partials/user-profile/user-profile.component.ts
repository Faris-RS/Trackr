import { Component } from '@angular/core';
import {
  faEnvelope,
  faPhone,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileModel } from 'src/app/core/models/user/userModel';
import { RentedModel } from 'src/app/core/models/user/vehicelModel';
import { UserProfileService } from 'src/app/core/services/user-profile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  constructor(
    private service: UserProfileService,
    private toast: HotToastService
  ) {}

  phone = faPhone;
  mail = faEnvelope;
  rent = faReceipt;

  userData!: UserProfileModel;
  rentModal: boolean = false;
  rented: RentedModel[] = [];
  loading: boolean = false;

  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails(): void {
    this.loading = true;
    this.service
      .getUserDetails()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.userData = response.user as UserProfileModel;
          if (this.userData.rentedVehicles.length > 0) {
            this.userData.user.isRenting = true;
            this.rented = this.userData.rentedVehicles.map(
              (data: RentedModel, index: number) => ({
                id: index + 1,
                ...data,
              })
            );
            this.loading = false;
          } else {
            this.userData.user.isRenting = false;
            this.loading = false;
          }
        } else {
          this.toast.error(response.message);
          this.loading = false;
        }
      });
    this.loading = false;
  }

  openModal(): void {
    this.rentModal = true;
  }

  closeModal(): void {
    this.rentModal = false;
  }
}
