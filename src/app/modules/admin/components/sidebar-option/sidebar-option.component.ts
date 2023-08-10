import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-option',
  templateUrl: './sidebar-option.component.html',
  styleUrls: ['./sidebar-option.component.css'],
})
export class SidebarOptionComponent {
  @Input() link: string = '';
  @Input() icon: any;
  
  constructor(private router: Router) {}

  goToSelected(): void {
    this.router.navigate([`/${this.link}`]);
  }

  get isActive(): boolean {
    return this.router.isActive(this.link, false);
  }
}
