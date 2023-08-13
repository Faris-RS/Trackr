import { Component } from '@angular/core';
import { GetUsersService } from '../../services/user-managment/get-users/get-users.service';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { UserData } from 'src/app/core/models/admin/userModel';
import { BlockUnblockUserService } from '../../services/user-managment/block-unblock-user/block-unblock-user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  ascending = faSortUp;
  descending = faSortDown;

  users: UserData[] = [];
  sortColumn: keyof UserData | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';
  filteredUsers: UserData[] = [];
  loading: boolean = false;

  constructor(
    private service: GetUsersService,
    private toggleStatus: BlockUnblockUserService,
    private toast: HotToastService
  ) {}

  private ngUnsubscribe = new Subject<void>();

  ngOnInit() {
    this.service
      .getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.users = result.users.map((user: any, index: number) => ({
          id: index + 1,
          ...user,
        }));
        this.applySortAndFilter();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleSort(column: keyof UserData): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySortAndFilter();
  }

  applySortAndFilter(): void {
    this.applySort();
    this.applyFilter();
  }

  applySort(): void {
    if (this.sortColumn) {
      this.users.sort((a, b) => {
        const aValue = a[this.sortColumn as keyof UserData];
        const bValue = b[this.sortColumn as keyof UserData];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return this.sortDirection === 'asc'
            ? aValue === bValue
              ? 0
              : aValue
              ? -1
              : 1
            : aValue === bValue
            ? 0
            : aValue
            ? 1
            : -1;
        }
        return 0;
      });
    }
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(filterValue) ||
        user.lastName.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
    );
  }

  toggleBlock(mail: string): void {
    this.loading = true;
    this.toggleStatus
      .blockUser(mail)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.status === 200) {
          this.service
            .getAllUsers()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((result) => {
              this.users = result.users.map((user: any, index: number) => ({
                id: index + 1,
                ...user,
              }));
              this.applySortAndFilter();
            });
          this.loading = false;
          this.toast.success(response.message);
        } else {
          this.loading = false;
          this.toast.error(response.message);
        }
      });
  }
}
