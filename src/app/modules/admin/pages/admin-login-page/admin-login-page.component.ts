import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css'],
})
export class AdminLoginPageComponent {
  constructor(private router: Router) {}

  isLogged: boolean = false;
  checkLoggedStatus(): void {
    if (localStorage.getItem('adminToken')) {
      this.isLogged = true;
      this.router.navigate(['/admin/home']);
    } else {
      this.isLogged = false;
      this.router.navigate(['/admin/login']);
    }
  }

  ngOnInit(): void {
    this.checkLoggedStatus();
  }
}
