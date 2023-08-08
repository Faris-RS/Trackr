import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserRegister } from 'src/app/core/models/user/userModel';
import { UserAuthenticationService } from 'src/app/core/services/authentication/user-authentication/user-authentication.service';

@Component({
  selector: 'app-user-signup-page',
  templateUrl: './user-signup-page.component.html',
  styleUrls: ['./user-signup-page.component.css'],
})
export class UserSignupPageComponent {
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

  isOTP: boolean = false;

  proceedToOTP(): void {
    console.log('hi');
    this.isOTP = true;

    try {
      let user: UserRegister = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      this.service.signupOTP(user).subscribe(
        (response) => {
          if (response.status === 200) {
            this.router.navigate(['/login']);
          } else {
            this.toast.error(response.message);
          }
        },
        (error) => {
          this.toast.error(error);
        },
        () => {
          this.loading = false;
        }
      );
    } catch (error) {
      console.error(error);
    }
    
  }
}
