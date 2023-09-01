import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';

@Injectable({
  providedIn: 'root',
})
export class AddVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/vehicle/';

  addVehicle(
    data: VehicleModel
  ): Observable<{ status: number; message: string }> {
    return this.http.post<{ status: number; message: string }>(
      `${this.server}addVehicle`,
      { data }
    );
  }
}
