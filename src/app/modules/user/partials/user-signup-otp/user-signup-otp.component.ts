import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDataService } from '../../services/user-data/user-data.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-signup-otp',
  templateUrl: './user-signup-otp.component.html',
  styleUrls: ['./user-signup-otp.component.css'],
})
export class UserSignupOtpComponent {
  @Output() verifyOTP = new EventEmitter<void>();
  @Input() loader: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private toast: HotToastService
  ) {}

  otp: string = '';

  onSubmit(): void {
    if (this.otp) {
      if (this.otp.length === 6) {
        this.userDataService.setOTP(this.otp);
        this.verifyOTP.emit();
      } else {
        this.toast.error('OTP should be 6 digits only');
      }
    } else {
      this.toast.error('Please enter the otp');
    }
  }

  resendOTP(): void {
    console.log('feature in progress');
  }
}
