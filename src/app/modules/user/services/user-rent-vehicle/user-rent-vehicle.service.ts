import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRentVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/user/vehicle/';

  rentVehicle(
    reg: string,
    rentDate: Date,
    returnDate: Date
  ): Observable<{ status: number; message: string }> {
    return this.http.put<{ status: number; message: string }>(
      `${this.server}rentVehicle`,
      { reg: reg, rentDate: rentDate, returnDate: returnDate }
    );
  }

  test(): Observable<any> {
    return this.http.get("http://103.120.178.195/Sang.Ray.Web.Api/Ray/GetTotal")
  }
}
