import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentData } from 'src/app/core/models/admin/userModel';

@Injectable({
  providedIn: 'root',
})
export class RentVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/vehicle/';

  rentVehicle(data: RentData): Observable<{ status: number; message: string }> {
    return this.http.put<{ status: number; message: string }>(
      `${this.server}rentVehicle`,
      data
    );
  }
}
