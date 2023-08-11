import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TogglePageService } from '../../services/toggle-page/toggle-page.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css'],
})
export class AdminHomePageComponent {
  constructor(private router: Router, private page: TogglePageService) {}
  link: string = '';

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.page.currentPage$.subscribe((data) => {
      const parts = data.split('/');
      if (parts.length > 1) {
        this.link = parts[1];
      }
    });
  }
}
