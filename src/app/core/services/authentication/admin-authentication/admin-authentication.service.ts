import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLogin } from 'src/app/core/models/admin/adminModel';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthenticationService {
  constructor(private http: HttpClient) {}

  private server: string = 'http://localhost:6335/admin/';
  // private server: string = 'https://libestorary.onrender.com/user/';

  doLogin(
    user: AdminLogin
  ): Observable<{ token?: string; message: string; name: string }> {
    const url = `${this.server}login`;
    return this.http.post<{ token?: string; message: string; name: string }>(
      url,
      user
    );
  }
}
