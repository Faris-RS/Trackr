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
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminSidebarComponent } from './partials/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './partials/admin-header/admin-header.component';
import { BarChartComponent } from './graphs/bar-chart/bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HeatmapComponent } from './graphs/heatmap/heatmap.component';
import { PieChartComponent } from './graphs/pie-chart/pie-chart.component';
import { SidebarOptionComponent } from './components/sidebar-option/sidebar-option.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListWithSearchComponent } from './components/user-list-with-search/user-list-with-search.component';
import { UserListWithSortComponent } from './components/user-list-with-sort/user-list-with-sort.component';
// import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSignupPageComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    AdminLoginPageComponent,
    AdminHomePageComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    BarChartComponent,
    HeatmapComponent,
    PieChartComponent,
    SidebarOptionComponent,
    UserListComponent,
    UserListWithSearchComponent,
    UserListWithSortComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NgApexchartsModule,
    // MatTableModule,
  ],
})
export class AdminModule {}
