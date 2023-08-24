import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  faCamera,
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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private service: UserProfileService,
    private toast: HotToastService,
    private http: HttpClient
  ) {}

  phone = faPhone;
  mail = faEnvelope;
  rent = faReceipt;
  camera = faCamera;

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

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileChange(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.loading = true;
      const reader = new FileReader();
      let imageData;
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        imageData = reader.result;

        this.http
          .post('http://localhost:6335/user/profile/updateProfile', {
            imageData,
          })
          .subscribe(
            (response) => {
              this.toast.success('Image updated successfully');
              this.loading = false;
              this.getProfileDetails();
            },
            (error) => {
              console.error('Error uploading image', error);
              this.toast.error('Error uploading image');
              this.loading = false;
            }
          );
      };
    }
  }
}
