import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminSignupPageComponent } from './pages/admin-signup-page/admin-signup-page.component';
import { AdminLoginComponent } from './partials/admin-login/admin-login.component';
import { AdminSignupComponent } from './partials/admin-signup/admin-signup.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSignupPageComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    AdminLoginPageComponent,
  ],
  imports: [CommonModule, FormsModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
