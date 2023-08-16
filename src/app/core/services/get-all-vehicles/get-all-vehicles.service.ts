import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicelModel } from '../../models/user/vehicelModel';

@Injectable({
  providedIn: 'root',
})
export class GetAllVehiclesService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/user/vehicle/';

  getAllVehicles(): Observable<{
    vehicle?: VehicelModel;
    message: string;
    status: number;
  }> {
    return this.http.get<{
      vehicle?: VehicelModel;
      message: string;
      status: number;
    }>(`${this.server}getAllVehicles`);
  }
}
