import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetVehiclesService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/vehicle/';

  getAllVehicles(): Observable<{
    vehicles?: any;
    message: string;
    status: number;
  }> {
    return this.http.get<{ vehicles?: any; message: string; status: number }>(
      `${this.server}getAllVehicles`
    );
  }
}
