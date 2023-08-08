import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminSignupPageComponent } from './pages/admin-signup-page/admin-signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,

    children: [
      {
        path: 'login',
        component: AdminLoginPageComponent,
      },
      {
        path: 'register',
        component: AdminSignupPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
