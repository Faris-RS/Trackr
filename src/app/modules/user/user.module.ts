import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserLoginComponent } from './partials/user-login/user-login.component';
import { UserSignupComponent } from './partials/user-signup/user-signup.component';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserSignupOtpComponent } from './partials/user-signup-otp/user-signup-otp.component';

@NgModule({
  declarations: [
    UserComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserLoginPageComponent,
    UserSignupPageComponent,
    UserSignupOtpComponent,
  ],
  imports: [CommonModule, FormsModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
