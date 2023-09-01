import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileModel } from '../../models/user/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/user/profile/';

  getUserDetails(): Observable<{
    user?: UserProfileModel;
    message: string;
    status: number;
  }> {
    return this.http.get<{
      user?: UserProfileModel;
      message: string;
      status: number;
    }>(`${this.server}getDetails`);
  }
}
