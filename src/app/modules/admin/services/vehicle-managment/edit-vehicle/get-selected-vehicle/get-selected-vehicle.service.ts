import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetSelectedVehicleService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/vehicle/';

  // getSelectedVehicle
}
