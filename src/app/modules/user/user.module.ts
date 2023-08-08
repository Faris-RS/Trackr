import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserLoginComponent } from './partials/user-login/user-login.component';
import { UserSignupComponent } from './partials/user-signup/user-signup.component';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';

@NgModule({
  declarations: [
    UserComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserLoginPageComponent,
    UserSignupPageComponent,
  ],
  imports: [CommonModule, FormsModule, UserRoutingModule],
})
export class UserModule {}
