import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { RentedModel } from 'src/app/core/models/user/vehicelModel';

@Component({
  selector: 'app-user-currently-rented-modal',
  templateUrl: './user-currently-rented-modal.component.html',
  styleUrls: ['./user-currently-rented-modal.component.css'],
})
export class UserCurrentlyRentedModalComponent {
  @Input() userName: string = '';
  @Input() rentedVehicles: RentedModel[] = [];
  @Output() closeModal = new EventEmitter<void>();

  cancel = faXmark;

  constructor(private datePipe: DatePipe) {}
  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  close(): void {
    this.closeModal.emit();
  }
}
