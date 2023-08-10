import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  constructor(private router: Router) {}

  logout = faPowerOff;
  name: string = '';

  ngOnInit(): void {
    this.getAdminName();
  }

  getAdminName(): void {
    this.name = JSON.stringify(localStorage.getItem('adminName'));
    this.name = this.name.replace(/['"]+/g, '');
  }

  doLogout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    this.router.navigate(['/admin/login']);
  }
}
