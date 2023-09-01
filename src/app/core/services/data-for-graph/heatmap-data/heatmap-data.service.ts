import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeatmapModel } from 'src/app/core/models/admin/graphModel';

@Injectable({
  providedIn: 'root',
})
export class HeatmapDataService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/graph/';

  getAllVehicles(): Observable<{
    data?: HeatmapModel;
    message: string;
    status: number;
  }> {
    return this.http.get<{
      data?: HeatmapModel;
      message: string;
      status: number;
    }>(`${this.server}heatmap`);
  }
}
