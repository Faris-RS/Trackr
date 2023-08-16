import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { OrderModel } from 'src/app/core/models/user/orderModel';
import { UserOrderHistoryService } from 'src/app/core/services/order-history/user-order-history/user-order-history.service';

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css'],
})
export class UserTimelineComponent {
  constructor(
    private service: UserOrderHistoryService,
    private toast: HotToastService
  ) {}
  orders: OrderModel[] = [];

  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.service
      .getAllOrders()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          if (Array.isArray(response.orders)) {
            this.orders = response.orders.map((order: any, index: number) => ({
              id: index + 1,
              vehicleName: order.vehicle.vehicleName,
              registrationNumber: order.vehicle.registrationNumber,
              rentedDate: order.rentedDate,
              returnDate: order.returnDate,
              returnedDate: order.returnedDate,
              weeks: order.weeks,
              fines: order.fines,
              total: order.total,
              processedMonth: order.processedMonth,
              processedYear: order.processedYear,
            }));
          }
        } else this.toast.error(response.message);
      });
  }
}
