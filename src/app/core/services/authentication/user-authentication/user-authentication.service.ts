import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegister, UserLogin } from 'src/app/core/models/user/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  constructor(private http: HttpClient) {}

  private server: string = 'http://localhost:6335/user/';
  // private server: string = 'https://libestorary.onrender.com/user/';

  doLogin(user: UserLogin): Observable<{ token?: string; message: string }> {
    const url = `${this.server}login`;
    
    return this.http.post<{ token?: string; message: string }>(url, user);
  }

  signupOTP(
    mail: string
  ): Observable<{ status: number; message: string }> {
    const url = `${this.server}signup/sentOTP`;
    return this.http.post<{ status: number; message: string }>(url, {email: mail});
  }

  doSignup(
    user: UserRegister,
    otp: string
  ): Observable<{ status: number; message: string }> {
    const url = `${this.server}signup/verifyOTP/${otp}`;
    
    return this.http.post<{ status: number; message: string }>(url, user);
  }
}
