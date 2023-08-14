import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultModel } from 'src/app/core/models/user/searchModel';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  constructor(private http: HttpClient) {}
  private server: string = 'http://localhost:6335/user/search/';

  getSearchResults(
    query: string,
    filter: number
  ): Observable<{
    result?: SearchResultModel;
    message: string;
    status: number;
  }> {
    return this.http.get<{
      result?: SearchResultModel;
      message: string;
      status: number;
    }>(`${this.server}${query}/${filter}`);
  }
}
