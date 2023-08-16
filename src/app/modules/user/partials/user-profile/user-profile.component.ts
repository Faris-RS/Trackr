import { Component } from '@angular/core';
import {
  faEnvelope,
  faPhone,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileModel } from 'src/app/core/models/user/userModel';
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

  userData!: UserProfileModel;
  phone = faPhone;
  mail = faEnvelope;
  rent = faReceipt;

  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails(): void {
    this.service
      .getUserDetails()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.userData = response.user as UserProfileModel;
          console.log(this.userData);
        } else this.toast.error(response.message);
      });
  }
}
