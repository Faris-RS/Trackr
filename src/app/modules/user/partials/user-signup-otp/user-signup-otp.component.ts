import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-signup-otp',
  templateUrl: './user-signup-otp.component.html',
  styleUrls: ['./user-signup-otp.component.css'],
})
export class UserSignupOtpComponent {
  @Output() verifyOTP = new EventEmitter<void>();

  ContinueFromOTP() {
    this.verifyOTP.emit();
  }
}
