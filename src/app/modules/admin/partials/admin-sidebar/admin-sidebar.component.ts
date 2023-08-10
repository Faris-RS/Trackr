import { Component } from '@angular/core';
import { faChartLine, faCar, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent {
  dashboard = faChartLine;
  car = faCar;
  users = faUsers;
}
