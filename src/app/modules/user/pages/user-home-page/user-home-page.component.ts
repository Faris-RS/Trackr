import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
})
export class UserHomePageComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/user/login']);
  }
}
