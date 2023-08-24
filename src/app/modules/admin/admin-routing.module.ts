import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { adminAuthGuard } from 'src/app/core/guards/admin-auth-guard/admin-auth.guard';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';

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
        path: 'home',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: AdminHomePageComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'user-list',
        component: AdminHomePageComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'vehicle-details',
        component: AdminHomePageComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'add-vehicle',
        component: AdminHomePageComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'order-history',
        component: AdminHomePageComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: '**',
        component: ErrorComponent,
      },
      {
        path: 'error',
        component: ErrorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
