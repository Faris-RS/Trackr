import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/vehicle/';

  deleteVehicle(data: string): Observable<{ message: string; status: number }> {
    return this.http.delete<{ message: string; status: number }>(
      `${this.server}deleteVehicle/${data}`
    );
  }
}
