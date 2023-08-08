import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserLogin } from 'src/app/core/models/user/userModel';
import { UserAuthenticationService } from 'src/app/core/services/authentication/user-authentication/user-authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  constructor(
    private service: UserAuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}
  email: string = '';
  password: string = '';
  loading: boolean = false;

  goToRegister(): void {
    this.router.navigate(['/user/register']);
  }

  // goToForgotPassword(): void {
  //   this.router.navigate(['/user/forgot']);
  // }

  onSubmit() {
    try {
      let user: UserLogin = {
        email: this.email,
        password: this.password,
      };

      if (!this.email.trim() || !this.password.trim()) {
        this.toast.error('Please provide both email and password');
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email)) {
        this.toast.error('Please enter a valid email address.');
        return;
      }

      this.loading = true;
      this.service.doLogin(user).subscribe(
        (response) => {
          if (response.token) {
            localStorage.setItem('userToken', response.token);
            this.router.navigate(['/home']);
          } else {
            this.toast.error(response.message);
            console.error('An error occured');
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
