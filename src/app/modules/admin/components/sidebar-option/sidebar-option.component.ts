import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TogglePageService } from '../../services/toggle-page/toggle-page.service';

@Component({
  selector: 'app-sidebar-option',
  templateUrl: './sidebar-option.component.html',
  styleUrls: ['./sidebar-option.component.css'],
})
export class SidebarOptionComponent {
  @Input() link: string = '';
  @Input() icon: any;

  constructor(private router: Router, private page: TogglePageService) {}

  goToSelected(): void {
    this.router.navigate([`/${this.link}`]);
    this.page.setNewPage(`${this.link}`);
  }

  get isActive(): boolean {
    return this.router.isActive(this.link, false);
  }
}
