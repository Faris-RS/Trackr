import { Component, OnInit } from '@angular/core';
import { GetUsersService } from '../../services/get-users/get-users.service';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  ascending = faSortUp;
  descending = faSortDown;

  users: UserData[] = [];
  sortColumn: keyof UserData | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';
  filteredUsers: UserData[] = [];

  constructor(private service: GetUsersService) {}

  ngOnInit() {
    this.service.getAllUsers().subscribe((result) => {
      this.users = result.users.map((user: any, index: number) => ({
        id: index + 1,
        ...user,
      }));
      console.log(this.users);

      this.applySortAndFilter();
    });
  }

  toggleSort(column: keyof UserData): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.applySortAndFilter(); // Apply both sorting and filtering
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
}
