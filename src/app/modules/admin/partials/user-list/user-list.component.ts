import { Component } from '@angular/core';
import { GetUsersService } from '../../services/get-users/get-users.service';
export interface UserData {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Johny Doe', email: 'john@example.com' },
    { id: 3, name: 'Johner Doe', email: 'john@example.com' },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com' },
  ];
  // users: UserData = []

  constructor(private service: GetUsersService) {}

  ngOnInit() {
    this.service.getAllUsers().subscribe((result) => {
      console.log(result.users);
    });
  }

  sortColumn: keyof UserData | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

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

  searchText: string = '';
  filteredUsers: UserData[] = this.users;

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
    );
  }
}
