import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserRegister } from 'src/app/core/models/user/userModel';
import { UserAuthenticationService } from 'src/app/core/services/authentication/user-authentication/user-authentication.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent {
  @Output() signupOTP = new EventEmitter<void>();

  constructor(
    private service: UserAuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

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
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email)) {
        this.toast.error('Please enter a valid email address.');
        return;
      }

      this.signupOTP.emit();

      // try {
      //   let user: UserRegister = {
      //     firstName: this.firstName,
      //     lastName: this.lastName,
      //     email: this.email,
      //     password: this.password,
      //   };
      //   this.loading = true;
      //   this.service.signupOTP(user).subscribe(
      //     (response) => {
      //       if (response.status === 200) {
      //         this.router.navigate(['/login']);
      //       } else {
      //         this.toast.error(response.message);
      //       }
      //     },
      //     (error) => {
      //       this.toast.error(error);
      //     },
      //     () => {
      //       this.loading = false;
      //     }
      //   );
      // } catch (error) {
      //   console.error(error);
      // }
    } else {
      this.toast.error('Passwords do not match');
    }
  }
}
