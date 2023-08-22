import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnVehicleModel } from 'src/app/core/models/admin/vehicleModel';

@Injectable({
  providedIn: 'root',
})
export class ReturnVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/admin/vehicle/';

  returnVehicle(
    data: ReturnVehicleModel
  ): Observable<{ message: string; status: number }> {
    return this.http.post<{ message: string; status: number }>(
      `${this.server}returnVehicle`,
      data
    );
  }
}
