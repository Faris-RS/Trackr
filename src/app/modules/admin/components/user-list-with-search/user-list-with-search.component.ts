import { Component } from '@angular/core';

export interface UserData {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list-with-search',
  templateUrl: './user-list-with-search.component.html',
  styleUrls: ['./user-list-with-search.component.css']
})
export class UserListWithSearchComponent {
  users: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more user data
  ];

  searchText: string = '';
  filteredUsers: UserData[] = this.users;

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue)
    );
  }
}
