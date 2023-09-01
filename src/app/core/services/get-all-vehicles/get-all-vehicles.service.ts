import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '../../models/user/vehicelModel';

@Injectable({
  providedIn: 'root',
})
export class GetAllVehiclesService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/user/vehicle/';

  getAllVehicles(): Observable<{
    vehicle?: VehicleModel;
    message: string;
    status: number;
  }> {
    return this.http.get<{
      vehicle?: VehicleModel;
      message: string;
      status: number;
    }>(`${this.server}getAllVehicles`);
  }
}
