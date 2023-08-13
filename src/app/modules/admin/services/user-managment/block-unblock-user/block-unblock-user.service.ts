import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockUnblockUserService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/admin/user/';

  blockUser(mail: string): Observable<{ status: number; message: string }> {
    return this.http.patch<{ status: number; message: string }>(
      `${this.server}blockUser`,
      {mail: mail}
    );
  }
}
