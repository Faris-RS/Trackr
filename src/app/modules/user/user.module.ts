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
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { UserHeaderComponent } from './partials/user-header/user-header.component';
import { UserSearchPageComponent } from './pages/user-search-page/user-search-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { HeaderListComponent } from './components/header-list/header-list.component';
import { UserFooterComponent } from './partials/user-footer/user-footer.component';

@NgModule({
  declarations: [
    UserComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserLoginPageComponent,
    UserSignupPageComponent,
    UserSignupOtpComponent,
    UserHomePageComponent,
    UserHeaderComponent,
    UserSearchPageComponent,
    UserProfilePageComponent,
    HeaderListComponent,
    UserFooterComponent,
  ],
  imports: [CommonModule, FormsModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
