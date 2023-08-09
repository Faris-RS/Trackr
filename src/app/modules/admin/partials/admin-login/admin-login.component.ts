import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AdminLogin } from 'src/app/core/models/admin/adminModel';
import { AdminAuthenticationService } from 'src/app/core/services/authentication/admin-authentication/admin-authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(
    private service: AdminAuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}
  email: string = '';
  password: string = '';
  loading: boolean = false;

  // goToRegister(): void {
  //   this.router.navigate(['/admin/register']);
  // }

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
            localStorage.setItem('adminToken', response.token);
            this.router.navigate(['/admin/home']);
          } else {
            this.loading = false;
            this.toast.error(response.message);
            console.error('An error occured');
          }
        },
        (error) => {
          this.toast.error(error);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    } catch (error) {
      console.error(error);
      this.loading = false;
    }
  }
}
