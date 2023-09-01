import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockUnblockUserService {
  constructor(private http: HttpClient) {}
  private server: string = 'https://trackr-bddx.onrender.com/admin/user/';

  blockUser(mail: string): Observable<{ status: number; message: string }> {
    return this.http.patch<{ status: number; message: string }>(
      `${this.server}blockUser`,
      {mail: mail}
    );
  }
}
