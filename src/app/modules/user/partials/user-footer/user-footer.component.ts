import { Component } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css'],
})
export class UserFooterComponent {
  scrollToTop(): void {
    this.smoothScrollTo(0, 0);
  }

  smoothScrollTo(x: number, y: number): void {
    window.scrollTo({ top: y, left: x, behavior: 'smooth' });
  }
}
