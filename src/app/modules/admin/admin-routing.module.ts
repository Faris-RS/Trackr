import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminSignupPageComponent } from './pages/admin-signup-page/admin-signup-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { adminAuthGuard } from 'src/app/core/guards/admin-auth-guard/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,

    children: [
      {
        path: 'login',
        component: AdminLoginPageComponent,
      },
      // {
      //   path: 'register',
      //   component: AdminSignupPageComponent,
      // },
      {
        path: 'home',
        component: AdminHomePageComponent,
        canActivate: [adminAuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
