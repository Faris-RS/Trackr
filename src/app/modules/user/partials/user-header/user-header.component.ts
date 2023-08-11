import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/user/login']);
  }

  
}
