import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from 'src/app/core/models/admin/vehicleModel';

@Injectable({
  providedIn: 'root',
})
export class EditVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/admin/vehicle/';

  editVehicle(
    data: VehicleModel
  ): Observable<{ message: string; status: number }> {
    return this.http.put<{ message: string; status: number }>(
      `${this.server}editVehicle`,
      data
    );
  }
}
