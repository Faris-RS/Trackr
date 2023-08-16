import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-hero',
  templateUrl: './user-hero.component.html',
  styleUrls: ['./user-hero.component.css'],
})
export class UserHeroComponent {
  constructor(private toast: HotToastService) {}
  surpriseMe(): void {
    this.toast.info('Feature in devolepment');
  }
}
