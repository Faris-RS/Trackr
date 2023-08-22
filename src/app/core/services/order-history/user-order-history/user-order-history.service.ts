import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/core/models/user/orderModel';

@Injectable({
  providedIn: 'root',
})
export class UserOrderHistoryService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/user/orders/';

  getAllOrders(): Observable<{
    orders?: OrderModel;
    message: string;
    status: number;
  }> {
    return this.http.get<{
      orders?: OrderModel;
      message: string;
      status: number;
    }>(`${this.server}`);
  }
}
