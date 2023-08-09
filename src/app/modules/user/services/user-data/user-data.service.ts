import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRegister } from 'src/app/core/models/user/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  private userOTP = new BehaviorSubject<any>(null);
  userOtp$ = this.userOTP.asObservable();

  setUserData(data: UserRegister) {
    this.userDataSubject.next(data);
  }

  setOTP(otp: string) {
    this.userOTP.next(otp);
  }
}
