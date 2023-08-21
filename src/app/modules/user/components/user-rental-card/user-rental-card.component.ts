import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-rental-card',
  templateUrl: './user-rental-card.component.html',
  styleUrls: ['./user-rental-card.component.css'],
})
export class UserRentalCardComponent {
  @Input() vehicleName: string = '';
  @Input() rent: string = '';
  @Input() rented!: boolean;
  @Output() openModal = new EventEmitter<void>();

  openRentModal(): void {
    this.openModal.emit();
  }
}
