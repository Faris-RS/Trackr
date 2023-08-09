import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserRegister } from 'src/app/core/models/user/userModel';
import { UserAuthenticationService } from 'src/app/core/services/authentication/user-authentication/user-authentication.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-signup-page',
  templateUrl: './user-signup-page.component.html',
  styleUrls: ['./user-signup-page.component.css'],
})
export class UserSignupPageComponent {
  constructor(
    private service: UserAuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  private ngUnsubscribe = new Subject<void>();
  loading: boolean = false;
  otp: string = '';
  isOTP: boolean = false;
  otpRequestTriggered: boolean = false;
  isLogged: boolean = false;

  checkLoggedStatus(): void {
    if (localStorage.getItem('userToken')) {
      this.isLogged = true;
      this.router.navigate(['/user/home']);
    } else {
      this.isLogged = false;
      this.router.navigate(['/user/register']);
    }
  }

  ngOnInit(): void {
    this.checkLoggedStatus();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  proceedToOTP(): void {
    if (!this.otpRequestTriggered) {
      this.otpRequestTriggered = true;

      try {
        this.userDataService.userData$
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((userData) => {
            if (userData) {
              this.loading = true;
              this.service.signupOTP(userData.email).subscribe(
                (response) => {
                  if (response.status === 200) {
                    this.isOTP = true;
                    this.loading = false;
                    this.toast.success(response.message);
                    this.otpRequestTriggered = false;
                  } else {
                    this.toast.error(response.message);
                  }
                },
                (error) => {
                  this.toast.error(error);
                  this.loading = false;
                  this.otpRequestTriggered = false;
                },
                () => {
                  this.loading = false;
                }
              );
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  verifyOTP(): void {
    this.userDataService.userOtp$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((otp) => {
        this.otp = otp;
      });

    this.userDataService.userData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((userData) => {
        const user: UserRegister = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        };
        this.loading = true;
        this.service.doSignup(user, this.otp).subscribe(
          (response) => {
            if (response.status === 200) {
              this.isOTP = false;
              this.loading = false;
              this.router.navigate(['/user/login']);
              this.toast.success(response.message);
            } else {
              this.toast.error(response.message);
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
      });
  }
}
