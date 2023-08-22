import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChartLine, faCar, faUsers, faPlus, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent {
  dashboard = faChartLine;
  car = faCar;
  users = faUsers;
  addCar = faPlus;
  history = faClock

  dashboardLink = 'admin/dashboard';
  carLink = 'admin/vehicle-details';
  addCarLink = 'admin/add-vehicle'
  usersLink = 'admin/user-list';
  historyLink = 'admin/order-history'

  constructor(private router: Router) {}
}
