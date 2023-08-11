import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.css'],
})
export class HeaderListComponent {
  @Input() label: string = '';
  @Input() link: string = '#';
  @Input() paddingX: boolean = false;
  @Input() paddingY: boolean = false;
  @Input() hover: boolean = false;

  constructor(private router: Router) {}

  goToSelected(): void {
    this.router.navigate([`/${this.link}`]);
  }

  get active(): boolean {
    return this.router.isActive(this.link, false);
  }
}
