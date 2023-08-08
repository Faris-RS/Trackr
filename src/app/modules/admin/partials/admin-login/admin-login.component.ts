import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserAuthenticationService } from 'src/app/core/services/authentication/user-authentication/user-authentication.service';
import { AdminLogin } from 'src/app/core/models/admin/adminModel';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(
    private service: UserAuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}
  email: string = '';
  password: string = '';
  loading: boolean = false;

  goToRegister(): void {
    this.router.navigate(['/admin/register']);
  }

  // goToForgotPassword(): void {
  //   this.router.navigate(['/admin/forgot']);
  // }

  onSubmit() {
    try {
      let user: AdminLogin = {
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
