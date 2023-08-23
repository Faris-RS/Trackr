import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
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
import { UserListComponent } from './partials/user-list/user-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { VehicleListComponent } from './partials/vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './partials/add-vehicle/add-vehicle.component';
import { AddRentDetailsComponent } from './modals/add-rent-details/add-rent-details.component';
import { EditVehicleDetailsComponent } from './modals/edit-vehicle-details/edit-vehicle-details.component';
import { ReturnVehicleModalComponent } from './modals/return-vehicle-modal/return-vehicle-modal.component';
import { AdminOrderHistoryComponent } from './partials/admin-order-history/admin-order-history.component';
import { AdminInjectJwtService } from 'src/app/core/interceptors/inject-jwt/admin/admin-inject-jwt.service';

@NgModule({
  declarations: [
    AdminComponent,
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
    VehicleListComponent,
    AddVehicleComponent,
    AddRentDetailsComponent,
    EditVehicleDetailsComponent,
    ReturnVehicleModalComponent,
    AdminOrderHistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    FontAwesomeModule,
    NgApexchartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInjectJwtService,
      multi: true,
    },
    DatePipe,
  ],
})
export class AdminModule {}
