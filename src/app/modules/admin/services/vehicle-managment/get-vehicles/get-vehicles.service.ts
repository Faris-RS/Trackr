import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetVehiclesService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/admin/vehicle/';

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
