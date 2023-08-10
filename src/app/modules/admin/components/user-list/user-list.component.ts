import { Component } from '@angular/core';

export interface UserData {
  id: number;
  name: string;
  email: string;
  // Add more user properties as needed
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    // Add more user data
  ];
}
