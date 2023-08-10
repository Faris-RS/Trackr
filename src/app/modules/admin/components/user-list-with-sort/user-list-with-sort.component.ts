import { Component } from '@angular/core';

export interface UserData {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list-with-sort',
  templateUrl: './user-list-with-sort.component.html',
  styleUrls: ['./user-list-with-sort.component.css']
})
export class UserListWithSortComponent {
  users: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more user data
  ];

  sortColumn: keyof UserData | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  toggleSort(column: keyof UserData): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.applySort();
  }

  applySort(): void {
    if (this.sortColumn) {
      this.users.sort((a, b) => {
        const aValue = a[this.sortColumn as keyof UserData];
        const bValue = b[this.sortColumn as keyof UserData];
  
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
  
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
  
        return 0;
      });
    }
  }
}
