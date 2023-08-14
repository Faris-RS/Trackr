import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchResultModel } from 'src/app/core/models/user/searchModel';
import { UserSearchService } from '../../services/user-search/user-search.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent {
  searchIcon = faMagnifyingGlass;

  priceRange: number = 0;
  searchQuery: string = '';
  searchResults: SearchResultModel[] = [];

  constructor(
    private service: UserSearchService,
    private toast: HotToastService
  ) {}

  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  doSearch(): void {
    if (this.searchQuery.trim()) {
      this.service
        .getSearchResults(this.searchQuery, this.priceRange)
        .pipe(takeUntil(this.ngUnsubscribe))
        .pipe(debounceTime(300))
        .subscribe((result) => {
          if (result.status === 200) {
            console.log(result.result);

            if (Array.isArray(result.result)) {
              this.searchResults = result.result;
            } else if (result.result) {
              this.searchResults = [result.result];
            } else {
              this.searchResults = [];
            }
          } else {
            this.toast.error(result.message);
          }
        });
    } else {
      this.searchResults = [];
    }
  }
}
