import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderHistoryService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/orders/';

  retrieveOrders(
    month: string,
    year: number
  ): Observable<{
    orders?: any;
    message: string;
    status: number;
  }> {
    return this.http.get<{ orders?: any; message: string; status: number }>(
      `${this.server}getAllOrders/${month}/${year}`
    );
  }
}
