import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { UserRentVehicleService } from '../../services/user-rent-vehicle/user-rent-vehicle.service';

@Component({
  selector: 'app-user-rent-modal',
  templateUrl: './user-rent-modal.component.html',
  styleUrls: ['./user-rent-modal.component.css'],
})
export class UserRentModalComponent {
  @Input() vehicleName: string = '';
  @Input() rent: string = '';
  @Input() registration: string = '';
  @Output() closeModal = new EventEmitter<void>();

  cancel = faXmark;

  constructor(
    private toast: HotToastService,
    private datePipe: DatePipe,
    private server: UserRentVehicleService
  ) {}

  private ngUnsubscribe = new Subject<void>();

  rentDate: Date = new Date();
  returnDate: Date = new Date();
  todayFormatted: string = this.getFormattedDate(new Date());
  returnFormatted: string = '';
  loading: boolean = false;
  total: number = 0;

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getFormattedDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  onReturnDateChange(): void {
    this.returnFormatted = this.getFormattedDate(this.rentDate);
  }

  // calculateTotal(): void {
  //   const daysDiff = Math.ceil((this.returnDate.getTime() - this.rentDate.getTime()) / (1000 * 3600 * 24));
  //   const weeks = Math.ceil(daysDiff / 7);
  //   this.total = Number(this.rent) * weeks
  // }

  onSubmit(): void {
    if (this.rentDate && this.returnDate) {
      console.log(this.rentDate, this.returnDate, this.registration);
      this.server
        .rentVehicle(this.registration, this.rentDate, this.returnDate)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response.status === 200) {
            this.toast.success(response.message);
            this.closeModal.emit();
          } else this.toast.error(response.message);
        });
    } else this.toast.warning('Please fill all forms');
  }

  close(): void {
    this.closeModal.emit();
  }
}
