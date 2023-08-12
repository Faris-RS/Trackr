import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';
import { GetSelectedVehicleService } from '../../services/edit-vehicle/get-current-vehicle/get-selected-vehicle.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-return-vehicle-modal',
  templateUrl: './return-vehicle-modal.component.html',
  styleUrls: ['./return-vehicle-modal.component.css'],
})
export class ReturnVehicleModalComponent {
  @Input() selectedVehicle: string = '';
  @Output() closeModal = new EventEmitter<void>();

  cancel = faXmark;
  vehicleData!: VehicleModel;
  weeks: number = 1;
  total: number = 0;

  constructor(
    private toast: HotToastService,
    private datePipe: DatePipe,
    private getVehicle: GetSelectedVehicleService
  ) {}

  private ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.getVehicleDetails();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  close() {
    this.closeModal.emit();
  }

  getFormattedDate(date: any): string {
    // Format the date using the DatePipe
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  getVehicleDetails(): void {
    this.getVehicle
      .getSelectedVehicle(this.selectedVehicle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          console.log(response.vehicle);
          this.vehicleData = response.vehicle;
          this.calculateTotal();
        } else this.toast.error(response.message);
      });
  }

  calculateTotal() {
    if (this.weeks < 1) {
      this.weeks = 1;
    }
    this.total = this.vehicleData.rate * this.weeks;
  }

  onSubmit(): void {
    console.log('Return functionality not yet implemented');
  }
}
