import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent {
  @Output() signupOTP = new EventEmitter<void>();
  @Input() loader: boolean = false;

  constructor(
    private toast: HotToastService,
    private userDataService: UserDataService
  ) {}

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.password === this.confirmPassword) {
      if (
        !this.firstName.trim() ||
        !this.lastName.trim() ||
        !this.email.trim() ||
        !this.password.trim()
      ) {
        this.toast.error('Please fill every field');
        return;
      } else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.email)) {
          this.toast.error('Please enter a valid email address.');
          return;
        } else {
          this.userDataService.setUserData({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          });

          this.signupOTP.emit();
        }
      }
    } else {
      this.toast.error('Passwords do not match');
    }
  }
}
