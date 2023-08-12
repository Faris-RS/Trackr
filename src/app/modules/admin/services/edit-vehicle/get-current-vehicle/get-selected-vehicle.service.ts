import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetSelectedVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/admin/vehicle/';

  getSelectedVehicle(
    data: string
  ): Observable<{ vehicle?: any; message: string; status: number }> {
    return this.http.get<{ vehicle?: any; message: string; status: number }>(
      `${this.server}getSelectedVehicle/${data}`
    );
  }
}
