import { Component, EventEmitter, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchResultModel } from 'src/app/core/models/user/searchModel';
import { UserSearchService } from '../../services/user-search/user-search.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { VehicleModel } from 'src/app/core/models/user/vehicelModel';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent {
  @Output() search = new EventEmitter<{ query: string; range: number }>();
  searchIcon = faMagnifyingGlass;

  priceRange: number = 0;
  searchQuery: string = '';

  doSearch(): void {
    this.search.emit({ query: this.searchQuery, range: this.priceRange });
  }
}
