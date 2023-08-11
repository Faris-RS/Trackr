import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { userAuthGuard } from 'src/app/core/guards/user-auth-guard/user-auth.guard';
import { UserSearchPageComponent } from './pages/user-search-page/user-search-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';

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
      {
        path: 'search',
        component: UserSearchPageComponent,
        canActivate: [userAuthGuard]
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
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
