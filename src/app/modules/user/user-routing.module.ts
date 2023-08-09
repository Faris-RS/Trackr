import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { userAuthGuard } from 'src/app/core/guards/user-auth-guard/user-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,

    children: [
      {
        path: 'login',
        component: UserLoginPageComponent,
      },
      {
        path: 'register',
        component: UserSignupPageComponent,
      },
      {
        path: 'home',
        component: UserHomePageComponent,
        canActivate: [userAuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
