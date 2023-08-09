import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css'],
})
export class UserLoginPageComponent {
  constructor(private router: Router) {}

  isLogged: boolean = false;
  checkLoggedStatus(): void {
    if (localStorage.getItem('userToken')) {
      this.isLogged = true;
      this.router.navigate(['/user/home']);
    } else {
      this.isLogged = false;
      this.router.navigate(['/user/login']);
    }
  }

  ngOnInit(): void {
    this.checkLoggedStatus();
  }
}
