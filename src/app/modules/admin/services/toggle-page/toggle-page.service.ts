import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TogglePageService {
  private newPage = new BehaviorSubject<string>('admin/order-history');
  currentPage$ = this.newPage.asObservable();

  setNewPage(data: string) {
    this.newPage.next(data);
  }
}
