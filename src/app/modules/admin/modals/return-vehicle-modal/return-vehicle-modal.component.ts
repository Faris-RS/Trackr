import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import {
  ReturnVehicleModel,
  VehicleModel,
} from 'src/app/core/models/admin/vehicleModel';
import { GetSelectedVehicleService } from '../../services/vehicle-managment/edit-vehicle/get-current-vehicle/get-selected-vehicle.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ReturnVehicleService } from '../../services/vehicle-managment/return-vehicle/return-vehicle.service';

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
  returnDate: Date = new Date();
  fines: number = 0;
  todayFormatted: string = this.getFormattedDate(new Date());
  loading: boolean = false;

  constructor(
    private toast: HotToastService,
    private datePipe: DatePipe,
    private getVehicle: GetSelectedVehicleService,
    private service: ReturnVehicleService
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
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  getVehicleDetails(): void {
    this.loading = true;
    this.getVehicle
      .getSelectedVehicle(this.selectedVehicle)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.vehicleData = response.vehicle;
          this.calculateTotal();
          this.loading = false;
        } else {
          this.toast.error(response.message);
          this.loading = false;
        }
      });
  }

  calculateTotal() {
    if (this.weeks < 1) {
      this.weeks = 1;
    }
    if (this.fines < 0) {
      this.fines = 0;
    }
    this.total = this.vehicleData.rate * this.weeks + this.fines;
  }

  onSubmit(): void {
    this.loading = true;
    const returnData: ReturnVehicleModel = {
      vehicle: this.vehicleData,
      returnedDate: this.returnDate,
      weeks: this.weeks,
      fines: this.fines,
      total: this.total,
    };
    if (!this.returnDate) {
      this.toast.error('Please fill all the fields');
      return;
    } else {
      this.service
        .returnVehicle(returnData)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
          if (response.status === 200) {
            this.toast.success(response.message);
            this.closeModal.emit();
            this.loading = false;
          } else {
            this.toast.error(response.message);
            this.loading = false;
          }
        });
    }
  }
}
