import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/user/';

  getAllUsers(): Observable<{
    users?: any;
    message: string;
    status: number;
  }> {
    return this.http.get<{ users?: any; message: string; status: number }>(
      `${this.server}getAllUsers`
    );
  }
}
