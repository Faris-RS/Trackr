import { Component } from '@angular/core';
import { UserSearchService } from '../../services/user-search/user-search.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SearchResultModel } from 'src/app/core/models/user/searchModel';
import { VehicleModel } from 'src/app/core/models/user/vehicelModel';

@Component({
  selector: 'app-user-search-page',
  templateUrl: './user-search-page.component.html',
  styleUrls: ['./user-search-page.component.css'],
})
export class UserSearchPageComponent {
  constructor(
    private service: UserSearchService,
    private toast: HotToastService
  ) {}

  lastQuery: string = '';
  lastRange: number = 0;

  searchResults: SearchResultModel[] = [];
  rentModal: boolean = false;
  selectedVehicle: VehicleModel = {
    vehicleName: '',
    rent: 0,
    registrationNumber: '',
  };

  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  doSearch(queryData: { query: string; range: number }): void {
    const { query, range } = queryData;
    this.lastQuery = query;
    this.lastRange = range;
    if (query.trim()) {
      this.service
        .getSearchResults(query, range)
        .pipe(takeUntil(this.ngUnsubscribe))
        .pipe(debounceTime(300))
        .subscribe((result) => {
          if (result.status === 200) {
            
            if (Array.isArray(result.result)) {
              this.searchResults = result.result;
            } else if (result.result) {
              this.searchResults = [result.result];
            } else {
              this.searchResults = [];
            }
            console.log(this.searchResults);

          } else {
            this.toast.error(result.message);
          }
        });
    } else {
      this.searchResults = [];
    }
  }

  openModal(name: string, rate: number, registrationNumber: string): void {
    console.log(registrationNumber);
    
    this.rentModal = true;
    this.selectedVehicle.rent = Number(rate);
    this.selectedVehicle.vehicleName = name;
    this.selectedVehicle.registrationNumber = registrationNumber;
  }

  closeModal(): void {
    this.rentModal = false;
    this.doSearch({ query: this.lastQuery, range: this.lastRange });
  }
}
